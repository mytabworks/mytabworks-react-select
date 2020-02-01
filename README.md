# mytabworks-react-select
This repository was build from the ground up. it is as expected to be a light-weight and fast because of the optimization.
It is a powerful yet light-weight dependency that can benefit both dev and user at it's fullest.
To make it optimize, user can search in the option without updating every entry. unless it is done in entry.<br/>
It support Enter to select and Backspace to remove multiple selected option

# installation

npm install --save mytabworks-react-select

# How to use

## import to your project
```
import Select from 'mytabworks-react-select'
```

## basic usage
```js
<Select id="country" name="country">
    {[
        {label: "Philippines", value: "ph"},
        {label: "United States", value: "us"},
        {label: "Africa", value: "af"}
    ]}
</Select>
```

## default value usage
It will set a default value of the select, but without onChange event it will be like a `read-only` instead use defaultValue.
```js
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
```js
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
```js
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

- `PROPERTY`  `DATATYPES`     `DEFAULT`
- id          | string *      |
- name        | string *      |
- value       | array|object  |
- defaultValue| array|object  |
- placeholder | string        | 
- className   | string        |
- disable     | bolean        | false
- multiple    | boolean       | false
- isAutoClear | boolean       | false
- onChange    | func          | 
- noDisplayText| string        | "no option"

# Jest Test issue?

jest test SyntaxError: unexpected token export? no problem!

## First solution
add to your jest configuration the transformIgnorePatterns containing /node_modules/(?!(?:mytabwork-utils))

```js
"transformIgnorePatterns": [
    "/node_modules/(?!(?:mytabwork-utils))"
]
```

## Second solution

### first step
you need to change .babelsrc to babel.config.js. in case you dont have .babelsrc you can create babel.config.js 
and copy your babel configuration in package.json then paste it in your babel.config.js. like below

```js
module.exports = {
    "presets": [
        "react-app"
      ]
}
```

#### second step
on package.json script test put the --transformIgnorePatterns '/node_modules/(?!(?:mytabwork-utils))' after test.

```js
"scripts": {
    "test": "react-app test --transformIgnorePatterns '/node_modules/(?!(?:mytabwork-utils))'"
}
``` 

it will work like a charm (^_^)y

## License
MIT Licensed. Copyright (c) Mytabworks 2020.