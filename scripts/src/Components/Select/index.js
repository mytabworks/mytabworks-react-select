import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DoneTypingEvent } from 'mytabworks-utils'
import { callBackChange, renderOptions, renderHiddenOptions, noop, navigatedOptions } from './utils'
import './index.css'

const SelectPropTypes = {
    id:             PropTypes.string.isRequired,
    name:           PropTypes.string.isRequired,
    placeholder:    PropTypes.string,
    className:      PropTypes.string,
    onChange:       PropTypes.func,
    multiple:       PropTypes.bool,
    disabled:       PropTypes.bool,
    isAutoClear:    PropTypes.bool,
    noDisplayText:  PropTypes.string,
    isSearch:       PropTypes.bool,
    searchSpeed:    PropTypes.number,
    value:          PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    defaultValue:   PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    children:       PropTypes.arrayOf(
        PropTypes.exact({ 
            label: PropTypes.string, 
            value: PropTypes.oneOfType([
                PropTypes.string, 
                PropTypes.arrayOf(PropTypes.exact({ 
                    label: PropTypes.string, 
                    value: PropTypes.string
                }))
            ])
        })
    ).isRequired
    
}

const SelectDefaultProps = {
    className: '',
    multiple: false,
    isAutoClear: false,
    disabled: false,
    noDisplayText: 'no option',
    isSearch: false,
    searchSpeed: 500
}

const findCorrectValue = ({finalValue, options, multiple}) => {
    const mappedOptions = options.map((row) => {
        return Array.isArray(row.value) ? 
            row.value
        : row
    })
    .flat()
    if(multiple) {
        return finalValue ? mappedOptions.filter(({value}) => finalValue.includes(value)) : []
    } else {
        const finds = finalValue ? mappedOptions.find(({value}) => value === finalValue) : null
        return finds ? [finds] : []
    }
}

const Select = ({id, name, className, children, placeholder, onChange, multiple, disabled, isAutoClear, noDisplayText, defaultValue, value, isSearch, searchSpeed, ...props}) => {

    let finalValue = value || defaultValue

    if(multiple && finalValue && !Array.isArray(finalValue)) {
        throw SyntaxError("Select is multiple but the defaultValue or value is not an array")
    }

    if(!multiple && finalValue && Array.isArray(finalValue)) {
        throw SyntaxError("Select is not multiple but the defaultValue or value is an array")
    }
    
    finalValue = useMemo(() => findCorrectValue({finalValue, options: children, multiple}), [finalValue, children, multiple])

    const [state, changeState] = useState({
        navigator: -1, 
        navigating: false, 
        isFocus: false, 
        isDropUp: false, 
        search: isSearch && !multiple && finalValue.length ? finalValue[0] : "", 
        selectedOptions: finalValue
    })

    const state_selectedOptions = state.selectedOptions, state_search = state.search, state_isFocus = state.isFocus, state_navigator = state.navigator, state_navigating = state.navigating

    let selector, searchbar, dropdown, isInteracting = false
    
    id = id || name

    props = { ...props, name, id} 
    
    if(multiple) {
        props.multiple = true
    }

    const hasValueButNoChangeEvent = value && !onChange 

    // focus the searchbar after the update
    useEffect(() => {
        state_isFocus && searchbar.focus()
    },[state_isFocus, searchbar])

    const showDropdown = () => {
        const {top, height} = selector.parentElement.getBoundingClientRect()
        const isBelowTheScreen = (top + height + 250) > window.innerHeight
        const updateState = { isFocus: true, isDropUp: isBelowTheScreen }
        changeState(prevstate => ({...prevstate,...updateState}))
    }

    const extraCuricular = (updateState, label) => {
        if(!multiple) {
            searchbar.blur()
            updateState.isFocus = false
        }

        if(isSearch && !multiple) {
            updateState.search = searchbar.value = label
        } else if(isAutoClear) { 
            updateState.search = searchbar.value = ''
        }
    }

    const changeStateAndCallback = (updateState) => { 
        changeState(prevstate => ({...prevstate, ...updateState}))
        onChange && callBackChange({selector, onChange, selectedOptions: updateState.selectedOptions, multiple})
    }
    
    const searchBarKeyBoardInteraction = e => {
        if(hasValueButNoChangeEvent ) return;
        
        const { which, target } = e  
        const searchValueIsEmpty = state_search === '' && target.value === '' 
        const isMultipleWithSO = state_selectedOptions.length && multiple
        const isBackSpace = which === 8
        if(isBackSpace && isMultipleWithSO && searchValueIsEmpty) { 
            const selectedOptions = state_selectedOptions.slice(0, -1)
            return changeStateAndCallback({ selectedOptions, navigating: false })
        }
        const supportedNavigation = [40,38,13].includes(which)
        if(!supportedNavigation || !state_isFocus) return;  
        
        const hasNavigator = state_navigator !== -1 
        const isArrowUp = 38, isArrowDown = 40, isEnter = 13
        const optionBase = dropdown.querySelector(".option")
        switch (which) {
            case isArrowUp: { 
                e.preventDefault()  
                if(!optionBase) return;
                const navigator = state_navigator > 0 ? Math.max(state_navigator - 1, 0) : 0 
                const optHeight = optionBase.offsetHeight
                const scrollTop = optHeight * navigator
                if(dropdown.scrollTop > scrollTop)
                    dropdown.scrollTop = scrollTop
                changeState(prevstate => ({...prevstate, navigator, navigating: true}))
            }    break;
            case isArrowDown: {
                e.preventDefault()
                if(!optionBase) return;
                const navigated = navigatedOptions({options: children, search: state_search})
                const navigator = hasNavigator ? Math.min(state_navigator + 1, navigated.length - 1) : 0
                const optHeight = optionBase.offsetHeight
                const scrollTop = (optHeight * navigator) - (dropdown.offsetHeight - optHeight)
                if(dropdown.scrollTop < scrollTop)
                    dropdown.scrollTop = scrollTop
                changeState(prevstate => ({...prevstate, navigator, navigating: true}))
            }   break;
            case isEnter: {
                const navigated = navigatedOptions({options: children, search: state_search})
                if(hasNavigator && state_navigating && navigated.length) { 
                    e.preventDefault()
                    const finalNav = hasNavigator 
                        ? state_navigator >= navigated.length 
                            ? navigated.length - 1
                            : state_navigator 
                        : 0;
                    const addOption = navigated[finalNav]
                    if(state_selectedOptions.some(row => row.label === addOption.label && row.value === addOption.value)) return;
                    const selectedOptions = multiple ? [...state_selectedOptions, addOption] :  [addOption]
                    const updateState = {selectedOptions, navigating: false}
                    extraCuricular(updateState, addOption.label)
                    changeStateAndCallback(updateState)
                } 
            }   break;
            default: 
                break;
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
            // keep focusing in
            searchbar.focus() 
            if(multiple && e.target.matches('.tag-close')) { 
                if(hasValueButNoChangeEvent) return; 
                const label = e.target.parentElement.textContent
                const selectedOptions = state_selectedOptions.filter(option => option.label !== label) 
                changeStateAndCallback({ selectedOptions, navigating: false })
            } else {
                isSearch || showDropdown()
            }
        }
    }

    let handleSelect = {
        // showing dropdown when click label for select
        onFocus: e => {
            isSearch || showDropdown()
        },
        // noop
        onChange: noop
    }

    let handleSearchbar = DoneTypingEvent(({target, keyCode, type}) => { //console.log(keyCode, type)
        const value = target.value = target.value.replace(/\W+/g, '');
        if(isSearch && !state_isFocus && selector) showDropdown()
        changeState(prevstate => ({...prevstate, search: value, navigating: false}))
    }, searchSpeed)
    
    // hiding dropdown
    // rewrite onBlur in done typing
    handleSearchbar.onBlur = e => {
        if(!isInteracting)
            changeState(prevstate => ({...prevstate, isFocus: false, navigating: false}))
        isInteracting = false
    }
    // preventing arrow up and down from jumping cursor
    handleSearchbar.onKeyDown = searchBarKeyBoardInteraction

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
            const selectedOptions = multiple ? [...state_selectedOptions, selected] : [selected] 
            const updateForState = { selectedOptions } 

            extraCuricular(updateForState, label)

            changeState(prevstate => ({...prevstate, ...updateForState }))
            onChange && callBackChange({selector, onChange, selectedOptions, multiple})
        }
    }

    if(disabled) {
        handleSelect = { onChange: noop }
        handleFacade = handleSearchbar = handlerDropdown = {}
    }

    if(isSearch && !multiple) {
        handleSearchbar[hasValueButNoChangeEvent ? "value" : "defaultValue"] = state_selectedOptions.length ? state_selectedOptions[0].label : ""
    }
    
    const filterOptions = useMemo(() => (
        renderOptions({search: state_search, selectedOptions: state_selectedOptions, id, options: children, navigator: state_navigating ? state_navigator : -1})
    ), [state_search, state_selectedOptions, id, children, state_navigator, state_navigating])
    
    const hiddenOptions = useMemo(() => renderHiddenOptions({id, options: children}), [id, children])

    const searchinput = <input ref={node => {searchbar = node}} className={ isSearch && !multiple ? "selector-facade" : multiple ? "selector-cursor" : "selector-search"} {...handleSearchbar} placeholder={ multiple ? placeholder : 'search options...'} disabled={disabled} />
    
    const selectorFacade = isSearch && !multiple 
        ? (
            searchinput
        ) : (
            <div className="selector-facade" {...handleFacade}>
                { 
                multiple 
                    ? <div className="selected-tags">{state_selectedOptions.map((row, key) => <span key={`${id}-${key}-selected`} className="selected-tag">{row.label}<span className="tag-close"></span></span>)} {searchinput}</div> 
                    : state_selectedOptions.length ? state_selectedOptions[0].label : <span className="placeholder">{placeholder}</span>
                }
            </div> 
        )
    

    return (
        <div className={`selector ${state_isFocus ? 'active' : ''} ${className} ${disabled ? 'disabled' : ''}`.trim()}> 
            <select ref={node => selector = node} {...props} value={multiple ? state_selectedOptions.map(row => row.value) : state_selectedOptions.length ? state_selectedOptions[0].value : ''} {...handleSelect}>
                <option value=""></option>
                {hiddenOptions}
            </select>
            {selectorFacade}
            <div className={`selector-dropdown ${state.isDropUp ? 'selector-dropup' : ''}`.trim()} {...handlerDropdown}>
                {(multiple || isSearch) || searchinput}
                <ul ref={node => dropdown = node}>
                {state_isFocus && (filterOptions.length && filterOptions.some(opt => !Array.isArray(opt) || opt.length > 0) ? filterOptions : <li className="has-no-display">{noDisplayText}</li>)}
                </ul>
            </div>
        </div>
      )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select