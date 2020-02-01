import React from 'react'

export const noop = () => {}

export const callBackChange = ({selectedOptions, onChange, selector, multiple}) => {
    const target = {
        name: selector.name,
        form: selector.form,
        selectedOptions
    }
    if(multiple) {
        target.value = selectedOptions
    } else {
        target.value = selectedOptions[0].value
    }
    onChange({ target, name: target.name, value: target.value, original: selector })
}

export const renderOptions = ({ options, id, search, selectedOptions}) => {
    
    const pattern = new RegExp(`^${search}`,'i')

    return options.filter(row => Array.isArray(row.value) || pattern.test(row.label)).map(({label, value}, key) => {
        
        if(!Array.isArray(value)) {
            return <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}`} value={value}>{label}</li>
        }
        if(pattern.test(label)) {
            return (
                <li className="optgroup" key={`${id}-${key}`}>
                    <b>{label}</b>
                    <ul>
                    { 
                        value.map(({label, value}, keyg) => <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}-${keyg}`} value={value}>{label}</li>) 
                    }
                    </ul>
                </li>
            )
        }

        return value.filter(row => pattern.test(row.label)).map(({label, value}, keyg) => <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}-${keyg}`} value={value}>{label}</li>)
    })
}

export const renderHiddenOptions = ({options, id}) => {
    
    return options.map(({label, value}, key) => Array.isArray(value)
        ? value.map(({label, value}, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)
        : <option key={`${id}-${key}`} value={value}>{label}</option>
    )
}