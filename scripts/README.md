[![NPM]](https://img.shields.io/badge/NPM-v1.1.1-crimson)(https://www.npmjs.com/package/mytabworks-react-select)

# mytabworks-react-select
This repository was build from the ground up. it is as expected to be a light-weight and fast because of the optimization.
It is a powerful yet light-weight dependency that can benefit both dev and user at it's fullest.
To make it optimize, user can search in the option without updating every entry. unless it is done in entry.<br/>
It support Enter to select and Backspace to remove multiple selected option

# installation
```
npm i mytabworks-react-select
```
# How to use

## import to your project
```js
import Select from 'mytabworks-react-select'
```

## basic usage
```html
<Select id="country" name="country">
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## value usage
It will set a value of the select, but without onChange event it will be like a `read-only`. instead use `defaultValue`.
```html
<Select id="country" name="country" value={{label: "Philippines", value: "ph"}}>
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## multiple property usage
It can select multiple options and set multiple default values.
```html
<Select id="emotions" name="emotions" defaultValue={[{label: "Happy", value: "1"}, {label: "Excited", value: "2"}]} multiple={true}>
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

## option group usage
It can group the options.
```html
<Select id="emotions" name="emotions" defaultValue={[{label: "Happy", value: "1"}, {label: "Excited", value: "2"}]} multiple={true}>
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
| onChange    | func          |             | it enables to subscribe change event| 
| noDisplayText| string       | "no option" | the text when there is no option|

## License
MIT Licensed. Copyright (c) Mytabworks 2020.
