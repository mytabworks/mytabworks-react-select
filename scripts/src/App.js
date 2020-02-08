import React from 'react'
import {Select} from './Components/'
import azadistan from './azadistan.json'
import './App.css'
const azadistanMapped = azadistan.map(row => ({label: row.name, value: row.shortCode}))

const container = {
    display: "block", 
    fontFamily: "Arial",
    float: "left",
}

const panel = {
    display: "inline-block",
    width: "50%", 
    boxShadow: "0 0 1px black",
}

const panel_header = {
    display: "block",
    padding: "15px 20px",
    backgroundColor: "#ececec",
    borderBottom :"1px solid #acacac"
}

const panel_body = {
    display: "block",
    padding: "15px 20px", 
    borderBottom :"1px solid #acacac"
}
const noop = e => console.log(e.target.value)

const App = () => (
    <div style={container}>
        <div style={panel}>
            <div style={panel_header}>
                Basic Usage
            </div>
    
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" defaultValue="19" >
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" defaultValue={["1", "2"]} multiple={true}>
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
            </div>
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Basic Controllable Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" value="1" >
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Multiple Controllable Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" value={["1", "2"]} multiple={true}>
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
            </div>
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Basic Controllable with onChange Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" value="19" onChange={noop} >
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Multiple Controllable with onChange Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." name="emotions" value={["1", "2"]} multiple={true} onChange={noop}>
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
            </div>
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Disabled Basic Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." disabled={true} name="emotions" defaultValue="4">
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
            </div>
                
        </div>

        <div style={panel}>
            <div style={panel_header}>
                Disabled Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." multiple={true} disabled={true} name="emotions" defaultValue={["3","5"]}>
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
            </div> 
        </div>
        
        <div style={panel}>
            <div style={panel_header}>
            isAutoClear Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isAutoClear={true} name="emotions" defaultValue="3">
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
            </div> 
        </div>
        <div style={panel}>
            <div style={panel_header}>
            isAutoClear Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." multiple={true} isAutoClear={true} name="emotions" defaultValue={["5","4"]}>
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
            </div> 
        </div>
        <div style={panel}>
            <div style={panel_header}>
                IsSearch Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} searchSpeed={100} name="emotions" defaultValue="BDG">
                    {azadistanMapped}
                </Select>
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                IsSearch Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} multiple={true} name="emotions" defaultValue={["1", "3"]}>
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Disabled IsSearch Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} disabled={true} searchSpeed={100} name="emotions" defaultValue="BDG">
                    {azadistanMapped}
                </Select>
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Disabled IsSearch Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} disabled={true} multiple={true} name="emotions" defaultValue={["1", "3"]}>
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Controllable Value isSearch Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} searchSpeed={100} name="emotions" value="BDG">
                    {azadistanMapped}
                </Select>
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Controllable Value isSearch Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" placeholder="choose..." isSearch={true} multiple={true} name="emotions" value={["1", "3"]}>
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
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Controllable Value isSearch With onChange Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" onChange={noop} placeholder="choose..." isSearch={true} searchSpeed={100} name="emotions" value="BDG">
                    {azadistanMapped}
                </Select>
            </div>
                
        </div>
        <div style={panel}>
            <div style={panel_header}>
                Controllable Value isSearch With onChange Multiple Usage
            </div>
            <div style={panel_body}>
                <Select id="emotions" onChange={noop} placeholder="choose..." isSearch={true} multiple={true} name="emotions" value={["1", "3"]}>
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
            </div>
                
        </div>
    </div>
)


export default App