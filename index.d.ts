import React from 'react'

declare module 'mytabworks-react-select'

interface OptValueProps {
    label: string;
    value: string;
}

export interface OptionProps {
    label: string;
    value: string | OptValueProps[]
}

export interface SelectProps { 
    id:             string;
    name:           string;
    placeholder?:   string;
    className?:     string;
    onChange?:      (event: any) => void;
    multiple?:      boolean;
    disabled?:      boolean;
    isAutoClear?:   boolean;
    noDisplayText?: string;
    isSearch?:      boolean;
    searchSpeed?:   number;
    value?:         string | string[];
    defaultValue?:  string | string[];
    children:       OptionProps[];
    isAutoNavigate?: boolean;
    isClearOptions?: boolean;
    isShowNoDisplay?:boolean;
    sortAlgorithm?: (a: OptionProps, b: OptionProps, c?: any) => OptionProps[];
    isFromStartSearch?:boolean;
}

declare const Select: React.FunctionComponent<SelectProps> 

export default Select
