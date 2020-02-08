[![NPM](https://img.shields.io/badge/NPM-v0.1.2-crimson)](https://www.npmjs.com/package/mytabworks-react-select)

# mytabworks-react-select 
This was an un-mediocre module which is build from the ground up to solve the problems in selection list especially when options are unreachable. it has no extra dependencies which can be a little less. 

- [Installation](#installation)
- [How To Use](#how-to-use)
    - [Importing](#import-to-your-project)
    - [Basic Usage](#basic-usage)
    - [Controllable Value Usage](#controllable-value-usage)
    - [Multiple Property Usage](#multiple-property-usage)
    - [Option Group Usage](#option-group-usage)
    - [Disabled Usage](#disabled-usage)
    - [isSearch Property Usage](#issearch-property-usage)
- [Properties](#properties) 
- [Keyboard Functionalities](#keyboard-functionalities)
- [License](#license)

# installation
```
npm i mytabworks-react-select
```
# How to use

## import to your project
```js
import Select from 'mytabworks-react-select'
```

## Basic Usage
```html
<Select id="country" name="country">
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## Controllable Value Usage
It will set a value of the select, but without onChange event it will be like a `read-only`. instead use `defaultValue`.
```html
<Select id="country" name="country" value="ph">
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## Multiple Property Usage
It can select multiple options and set multiple default values.
```html
<Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple={true}>
    {[
        {label: "Happy", value: "1"},
        {label: "Excited", value: "2"},
        {label: "Sad", value: "3"},
        {label: "Angry", value: "4"}, 
        {label: "Scared", value: "5"},
        {label: "Hype", value: "6"}
    ]}
</Select>
```

## Option Group Usage
It can group the options.
```html
<Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple={true}>
    {[  
        {label: "Possitive", value: [
            {label: "Happy", value: "1"},
            {label: "Excited", value: "2"}
        ]}, 
        {label: "Negative", value: [
            {label: "Sad", value: "3"},
            {label: "Angry", value: "4"}, 
            {label: "Scared", value: "5"}
        ]},
        {label: "Hype", value: "6"}
    ]}
</Select>
```

## Disabled Usage
It can group the options.
```html
<Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple={true} disabled={true}>
    {[  
        {label: "Possitive", value: [
            {label: "Happy", value: "1"},
            {label: "Excited", value: "2"}
        ]}, 
        {label: "Negative", value: [
            {label: "Sad", value: "3"},
            {label: "Angry", value: "4"}, 
            {label: "Scared", value: "5"}
        ]},
        {label: "Hype", value: "6"}
    ]}
</Select>
```

## isSearch Property Usage
It suggest an option when starting searching or typing
```js
const list = [....]
....
```
```html
<Select id="list" name="list" multiple={true} isSearch={true} searchSpeed={100}>
    {list}
</Select>
```

# Properties
All properties that is supported by mytabworks-react-select.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| id          | string *      |             | id of the HTML select|
| name        | string *      |             | name of the HTML select|
| value       | array\|object |             | control the [current value](https://github.com/mytabworks/mytabworks-react-select/blob/master#current-value-usage)|
| defaultValue| array\|object |             | the default value|
| placeholder | string        |             | placeholder of your Select|
| className   | string        |             | additional className for the Component container|
| disabled    | bolean        | false       | disabling the Select|
| multiple    | boolean       | false       | it allow users to select multiple option|
| isAutoClear | boolean       | false       | it clear the searched text after selecting|
| isSearch    | boolean       | false       | it only drop the options when start typing|
| onChange    | func          |             | it enables to subscribe change event| 
| noDisplayText| string       | "no option" | the text when there is no option|
| searchSpeed | number        | 500         | it is the delay when stop typing|
| children    | arrayOf({</br>label: string,</br> value: string\|arrayOf({</br>label: string, value: string</br>})</br>})| | the option list |

# Keyboard Functionalities 

|`KEY`|`DESCRIPTION`|`REQUIREMENT` |
|-----------|-------------|--------------|
| Arrow Down| arrow down can be use to navigate selection downward| when options is opened |
| Arrow Up  | arrow up can be use to navigate selection upward|when options is opened |
| Enter     | enter can be use when you already navigated your option| when options is opened
| Backspace | backspace can be use when search bar is already empty in multiple selection list| when searchbar is already empty but will not triggered when there is a text then use backspace till its empty unless the searchbar is already empty |
## License
MIT Licensed. Copyright (c) fernando tabamo jr(Mytabworks) 2020. 
