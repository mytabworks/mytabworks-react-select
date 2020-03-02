[![NPM](https://img.shields.io/badge/NPM-v0.2.4-crimson)](https://www.npmjs.com/package/mytabworks-react-select)

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
    - [sortAlgorithm Property Usage](#sortalgorithm-property-usage)
    - [Typescript Supported Usage](#typescript-supported-usage)
- [Properties](#properties) 
- [Keyboard Functionalities](#keyboard-functionalities)
- [License](#license)

# installation
```
npm i mytabworks-react-select
```
or
```
yarn add mytabworks-react-select
```
# How to use

## import to your project
```js
import Select from 'mytabworks-react-select'
```

## Basic Usage
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```html
<Select id="country" name="country" placeholder="Choose one">
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## Controllable Value Usage
It will set a value of the select, but without onChange event it will be like a `read-only`. instead use `defaultValue`.<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
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
It can select multiple options and set multiple default values.<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```html
<Select id="emotions" name="emotions" placeholder="choose one or more" defaultValue={["1","2"]} multiple>
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
It can group the options.<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```html
<Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple>
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
It can group the options.<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```html
<Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple disabled>
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
It suggest an option when starting searching or typing<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```js
const list = [....]
....
```
```html
<Select id="list" name="list" multiple isSearch searchSpeed={100}>
    {list}
</Select>
```

## sortAlgorithm Property Usage
It can change the algorithm of the search when sorting<br><br>
[![Edit mytabworks-react-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mytabworks-react-select-06plg?fontsize=14&hidenavigation=1&theme=dark)
```js
const list = [....]

const priority_and_asc_algo = (a, b, {pattern, search, asc_algo}) => {
    const a_ = a.label.match(pattern).index;
    const b_ = b.label.match(pattern).index;
    const priority = ["Sund", "Budol budol"]
    return (a_ === 0 &&  priority.includes(a.label)) || ( b_ === 0 && priority.includes(b.label) ? false : asc_algo )
}

const desc_algo = (a, b, {pattern}) => {
    const a_ = a.label.match(pattern).index;
    const b_ = b.label.match(pattern).index;
    return a_ > b_
}
```
```html
<Select id="list" name="list" multiple isSearch searchSpeed={100}
sortAlgorithm={priority_and_asc_algo}>
    {list}
</Select>
```

## Typescript Supported Usage
```js
import Select, {SelectProps, OptionProps} from "mytabworks-react-select"
```
```js
const list: OptionProps[] = [....]
....
```
```html
<Select id="list" name="list" multiple isSearch searchSpeed={100}>
    {list}
</Select>
```


# Properties
All properties that is supported by mytabworks-react-select.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| id          | string *      | &nbsp;            | id of the HTML select|
| name        | string *      | &nbsp;            | name of the HTML select|
| value       | array\|object | &nbsp;            | control the [current value](#controllable-value-usage)|
| defaultValue| array\|object | &nbsp;            | the default value|
| placeholder | string        | &nbsp;            | placeholder of your Select|
| className   | string        | &nbsp;            | additional className for the Component container|
| disabled    | bolean        | false       | disabling the Select|
| multiple    | boolean       | false       | it allow users to select multiple option|
| isAutoClear | boolean       | false       | it clear the searched text after selecting|
| isSearch    | boolean       | false       | it only drop the options when start typing|
| isAutoNavigate| boolean       | false       | it navigates the first row in the options without navigating |
| isClearOptions | boolean       | true       | it clear the option list when options is not active |
| isShowNoDisplay | boolean       | true       | it will show the noDisplay when there is no option matched, if it is false it will not show|
| isFromStartSearch | boolean | false | it only allow matches from the exact beginning of the searched text |
| onChange    | function         |             | it enables to subscribe change event| 
| noDisplayText| string       | "no option" | the text when there is no option|
| searchSpeed | number        | 500         | it is the delay when stop typing|
| sortAlgorithm | function    | &nbsp;      | it is use to change the algorithm of the sort, it must return true if option a is ascending from option b. false if option a is decending |
| children    | Array<{</br> &nbsp;&nbsp;&nbsp;label: string,</br> &nbsp;&nbsp;&nbsp;value: string\|Array<{</br>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label: string, </br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: string</br> &nbsp;&nbsp;&nbsp;}></br>}>| | the option list |

# Keyboard Functionalities 

|`KEY`|`DESCRIPTION`|`REQUIREMENT` |
|-----------|-------------|--------------|
| Arrow Down| arrow down can be use to navigate selection downward| when options is opened |
| Arrow Up  | arrow up can be use to navigate selection upward|when options is opened |
| Enter     | enter can be use when you already navigated your option| when options is opened
| Backspace | backspace can be use when search bar is already empty in multiple selection list| when searchbar is already empty but will not triggered when there is a text then use backspace till its empty unless the searchbar is already empty |
| ESC | it will close the dropdown option| | 


## License
MIT Licensed. Copyright (c) fernando tabamo jr(Mytabworks) 2020. 
