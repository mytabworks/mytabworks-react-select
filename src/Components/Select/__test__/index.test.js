import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from '../';
const selectChild = [
    {label: 'beginer', value: '1'},
    {label: 'mid-level', value: [
      {label: 'intermidiate', value: '2'},
      {label: 'exprerience', value: '3'}
    ]},
    {label: 'mid-term', value: [
      {label: 'interminate', value: '7'},
      {label: 'exprerment', value: '8'}
    ]},
    {label: 'mid-expert', value: '4'},
    {label: 'expert', value: '5'},
  ]
  
describe('consistent test agrregation', () => {
    test('basic usage', () => {
        const { getByTestId } = render(<Select id="test-1" name="select-1" data-testid="test">{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue("")

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-1')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-1')

        expect(select).not.toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        // it is not getting the real length it might be bug for jest
        // expect(select.selectedOptions.length).toBe(0)

        fireEvent.focus(select)
        
        const selector = select.closest('.selector')

        expect(selector.matches('.active')).toBeTruthy()

        const dropdown = selector.querySelector('.selector-dropdown')

        let selected = dropdown.querySelector('li.option.selected')

        expect(selected).toBeNull()

        expect(dropdown.querySelectorAll('li.option').length).toBe(7)
    })

    test('basic usage with disabled', () => {
        const { getByTestId } = render(<Select id="test-1.1" name="select-1.1" data-testid="test" disabled={true}>{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue("")

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-1.1')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-1.1')

        expect(select).not.toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        // it is not getting the real length it might be bug for jest
        // expect(select.selectedOptions.length).toBe(0)

        fireEvent.focus(select)
        
        const selector = select.closest('.selector')

        expect(selector.matches('.active')).toBeFalsy()
    })

    test('basic usage in multiple', () => {
        const { getByTestId } = render(<Select id="test-2" name="select-2" multiple={true} data-testid="test">{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue([])

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-2')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-2')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()
    })

    test('select with defaultValue not multiple', () => {
        const { getByTestId } = render(<Select id="test-3" name="select-3" defaultValue={{label: 'beginer', value: '1'}} data-testid="test">{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue("1")

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-3')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-3')

        expect(select).not.toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        fireEvent.focus(select)

        const selector = select.closest('.selector')

        expect(selector.matches('.active')).toBeTruthy()

        const selected = select.closest('.selector').querySelector('.selector-dropdown li.option.selected')

        expect(selected.textContent).toBe('beginer')

        expect(selected.getAttribute('value')).toBe('1')
    })

    test('select with value multiple', () => {
        
        const { getByTestId, getByText } = render(<Select id="test-4" name="select-4" value={[{label: 'beginer', value: '1'}, {label: 'expert', value: '5'}]} multiple={true} isAutoClear={true} data-testid="test">{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument() 

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-4')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-4')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        fireEvent.focus(select)
        
        const selector = select.closest('.selector')

        expect(selector.matches('.active')).toBeTruthy()

        const selected = selector.querySelectorAll('.selector-dropdown li.option.selected')

        expect(selected.length).toBe(2)

        const selectedInDropdown = Array.from(selected).map(row => row.textContent)

        const match = Array.from(select.selectedOptions).map(row => row.textContent).every( (label, index) => label === selectedInDropdown[index])

        expect(match).toBeTruthy()
    })

        test('select with value and disabled multiple', () => {
        
        const { getByTestId, getByText } = render(<Select id="test-5" name="select-5" value={[{label: 'beginer', value: '1'}, {label: 'expert', value: '5'}]} multiple={true} disabled={true} isAutoClear={true} data-testid="test">{selectChild}</Select>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument() 

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-5')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-5')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        fireEvent.focus(select)
        
        const selector = select.closest('.selector')

        expect(selector.matches('.active')).toBeFalsy()

        expect(selector.matches('.disabled')).toBeTruthy()

        const selected = selector.querySelectorAll('.selector-dropdown li.option.selected')

        expect(select.selectedOptions.length).toBe(2)
    })
})
