import React from 'react'

export const noop = () => {}

export const callBackChange = ({selectedOptions, onChange, selector, multiple}) => {
    const selectedOptionsMapped = selectedOptions.map(({value}) => value)
    const target = {
        name: selector.name,
        form: selector.form,
        selectedOptions: selectedOptionsMapped
    }
    if(multiple) {
        target.value = selectedOptionsMapped
    } else {
        target.value = selectedOptionsMapped[0]
    }
    onChange({ target, name: target.name, value: target.value, original: selector })
}

const hasHighlights = (selectedOptions, value, isNavigator) => {
    return isNavigator ? " navigating" : (selectedOptions.some(row => row.value === value) ? " selected" : "")
}

export const renderOptions = ({ options, id, search, selectedOptions, navigator}) => {
    let findnav = -1

    const pattern = new RegExp(`${search}`,'i')
    
    return searchedFilter({options, pattern}).map(({label, value}, key) => { 
        if(!Array.isArray(value)) {
            findnav++
            return <li className={"option"+ hasHighlights(selectedOptions, value, navigator === findnav)} key={`${id}-${key}`} value={value}>{label}</li>
        } else {
            return (
                <li className="optgroup" key={`${id}-${key}`}>
                    <b>{label}</b>
                    <ul>
                    { 
                       value.map(({label, value}, keyg) => {
                            findnav++ 
                            return  <li className={"option"+ hasHighlights(selectedOptions, value, navigator === findnav)} key={`${id}-${key}-${keyg}`} value={value}>{label}</li>
                        }) 
                    }
                    </ul>
                </li>
            )
        }
    })
}

export const renderHiddenOptions = ({options, id}) => {
    
    return options.map(({label, value}, key) => Array.isArray(value)
        ? value.map(({label, value}, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)
        : <option key={`${id}-${key}`} value={value}>{label}</option>
    )
}


export const navigatedOptions = ({options, search}) => {
    
    const pattern = new RegExp(`${search}`,'i')

    return searchedFilter({options, pattern}).map(row => Array.isArray(row.value) 
            ? row.value //&& !state_selectedOptions.some(srow => srow.label === frow.label))  
            : row //!state_selectedOptions.some(srow => srow.label === row.label) ? row : []
        ).flat()
}

const sortOptions = (data, pattern) => { 
    return data.sort((a, b) => {
        return a.label.match(pattern).index < b.label.match(pattern).index ? -1 : 1
    })
}

export const searchedFilter = ({options, pattern}) => { 

    return sortOptions(options 
        .filter( row => (pattern.test(row.label) /*&& !state_selectedOptions.some(srow => srow.label === row.label))*/|| Array.isArray(row.value)))
        .map(row => Array.isArray(row.value) 
            ? pattern.test(row.label) 
                ? row //row.value.filter(frow => !state_selectedOptions.some(srow => srow.label === frow.label)) 
                : row.value.filter(frow => pattern.test(frow.label)) //&& !state_selectedOptions.some(srow => srow.label === frow.label))  
            : row //!state_selectedOptions.some(srow => srow.label === row.label) ? row : []
        ).flat(), pattern)
}
