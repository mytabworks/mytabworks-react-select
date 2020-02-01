import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DoneTypingEvent } from 'mytabworks-utils'
import { callBackChange, renderOptions, renderHiddenOptions, noop } from './utils'
import './index.css'

const SelectPropTypes = {
    id:             PropTypes.string.isRequired,
    name:           PropTypes.string.isRequired,
    placeholder:    PropTypes.string,
    className:      PropTypes.string,
    children:       PropTypes.array.isRequired,
    onChange:       PropTypes.func,
    multiple:       PropTypes.bool,
    disabled:       PropTypes.bool,
    isAutoClear:    PropTypes.bool,
    noDisplayText:  PropTypes.string,
    value:          PropTypes.any,
    defaultValue:   PropTypes.any
}

const SelectDefaultProps = {
    className: '',
    multiple: false,
    isAutoClear: false,
    disabled: false,
    noDisplayText: 'no option',
    defaultValue: []
}

const Select = ({id, name, className, children, placeholder, onChange, multiple, disabled, isAutoClear, noDisplayText, defaultValue, value, ...props}) => {

    const finalValue = value || defaultValue

    const [state, changeState] = useState({isFocus: false, isDropUp: false, search: '', selectedOptions: Array.isArray(finalValue) && multiple ? finalValue : Array.isArray(finalValue) ? finalValue : [finalValue]})

    let selector, searchbar, isInteracting = false
    
    id = id || name

    props = { ...props, name, id} 
    
    if(multiple) {
        props.multiple = true
    }

    const hasValueButNoChangeEvent = value && !onChange 

    // focus the searchbar after the update
    useEffect(() => {
        state.isFocus && searchbar.focus()
    },[state, searchbar])

    const showDropdown = () => {
        const {top, height} = selector.parentElement.getBoundingClientRect() 
        const isBelowTheScreen = (top + height + 250) > window.innerHeight
        const updateState = { isFocus: true, isDropUp: isBelowTheScreen }
        changeState(prevstate => ({...prevstate,...updateState}))
    }

    const changeStateAndCallback = (selectedOptions) => {
        changeState(prevstate => ({...prevstate, selectedOptions}))
        onChange && callBackChange({selector, onChange, selectedOptions, multiple})
    }
    
    const searchBarKeyBoardInteraction = e => {
        if(hasValueButNoChangeEvent) return;

        const isBackSpaceAndSearchValueIsEmpty = e.keyCode === 8 && state.search === '' && e.target.value === '' && state.selectedOptions.length
        if(isBackSpaceAndSearchValueIsEmpty) {
            const selectedOptions = state.selectedOptions.slice(0, -1)
            changeStateAndCallback(selectedOptions)
        }
        if(e.type === 'keypress' && e.which === 13) {
            e.preventDefault()
            const pattern = new RegExp(`^${e.target.value.replace(/\W+/g, '')}`,'i')
            const lioptions = children 
            .filter( row => (pattern.test(row.label) && !state.selectedOptions.some(srow => srow.label === row.label))|| Array.isArray(row.value))
            .map(row => Array.isArray(row.value) 
                ? pattern.test(row.label) 
                    ? row.value.filter(frow => !state.selectedOptions.some(srow => srow.label === frow.label)) 
                    : row.value.filter(frow => pattern.test(frow.label) && !state.selectedOptions.some(srow => srow.label === frow.label))  
                : !state.selectedOptions.some(srow => srow.label === row.label) ? row : []
            )
            .flat()
            if(lioptions.length) {
                const selectedOptions = [...state.selectedOptions, lioptions[0]]
                changeStateAndCallback(selectedOptions)
            }
        }
    }

    const interuptBlur = () => {
        isInteracting = true 
        return false
    }
    
    let handleFacade = { 
        onMouseDown: interuptBlur,
        // showing dropdown when click the facade
        onMouseUp: e => { 
            if(multiple && e.target.matches('.tag-close')) {
                const label = e.target.parentElement.textContent
                const selectedOptions = state.selectedOptions.filter(option => option.label !== label)
                changeStateAndCallback(selectedOptions)
            } else {
                showDropdown()
            }
        }
    }

    let handleSelect = {
        // showing dropdown when click label for select
        onFocus: showDropdown,
        // noop
        onChange: noop
    }

    let handleSearchbar = DoneTypingEvent(({target, type}) => {
        const value = target.value = target.value.replace(/\W+/g, '')
        changeState(prevstate => ({...prevstate, search: value}))
    }, 500, multiple ? searchBarKeyBoardInteraction : undefined )
    
    // hiding dropdown
    // rewrite onBlur in done typing
    handleSearchbar.onBlur = e => {
        if(!isInteracting)
            changeState(prevstate => ({...prevstate, isFocus: false}))
        isInteracting = false
    }

    let handlerDropdown = {
        // one step faster than onBlur so it can stop the change when clicking 
        onMouseDown: interuptBlur,
        // core selecting a option
        onMouseUp: e => {
            const { target } = e
            searchbar.focus()
            if(!target.matches('.option:not(.selected)') || hasValueButNoChangeEvent) return;
            const value = target.getAttribute('value')
            const label = target.textContent  
            const selected = {label, value}
            const selectedOptions = multiple ? [...state.selectedOptions, selected] : [selected] 
            const updateForState = { selectedOptions }
            
            if(isAutoClear) { 
                updateForState.search = searchbar.value = ''
            }

            if(!multiple) {
                searchbar.blur()
                updateForState.isFocus = false
            }

            changeState(prevstate => ({...prevstate, ...updateForState }))
            onChange && callBackChange({selector, onChange, selectedOptions, multiple})
        }
    }

    if(disabled) {
        handleSelect = { onChange: noop }
        handleFacade = handleSearchbar = handlerDropdown = {}
    }
    
    const filterOptions = useMemo(() => renderOptions({search: state.search, selectedOptions: state.selectedOptions, id, options: children}), [state.search, state.selectedOptions, id, children])
    
    const hiddenOptions = useMemo(() => renderHiddenOptions({id, options: children}), [id, children])

    const searchinput = <input ref={node => searchbar = node} className={ multiple ? "selector-cursor" : "selector-search"} {...handleSearchbar} placeholder={ multiple ? placeholder : 'search options...'} disabled={disabled} />

    return (
        <div className={`selector ${state.isFocus ? 'active' : ''} ${className} ${disabled ? 'disabled' : ''}`.trim()}> 
            <select ref={node => selector = node} {...props} value={multiple ? state.selectedOptions.map(row => row.value) : state.selectedOptions.length ? state.selectedOptions[0].value : ''} {...handleSelect}>
                <option value=""></option>
                {hiddenOptions}
            </select>
            <div className="selector-facade" {...handleFacade}>
            { multiple 
                ? <div className="selected-tags">{state.selectedOptions.map((row, key) => <span key={`${id}-${key}-selected`} className="selected-tag">{row.label}<span className="tag-close"></span></span>)} {searchinput}</div> 
                : state.selectedOptions.length ? state.selectedOptions[0].label : <span className="placeholder">{placeholder}</span>
            }
            </div> 
            <div className={`selector-dropdown ${state.isDropUp ? 'selector-dropup' : ''}`.trim()} {...handlerDropdown}>
                {multiple || searchinput}
                <ul>
                {state.isFocus && (filterOptions.length && filterOptions.some(opt => !Array.isArray(opt) || opt.length > 0) ? filterOptions : <li className="has-no-display">{noDisplayText}</li>)}
                </ul>
            </div>
        </div>
      )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select

