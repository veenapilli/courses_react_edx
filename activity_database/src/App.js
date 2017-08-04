import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';



function Fields(props){
  return(
    <div>
      First Name: <br/>
      <input type="text" name='firstname' value={props.firstname}
        onChange = { (e) => {
          props.handleChange(e, 'firstname')
        }}/><br/><br/>
      Last Name: <br/>
      <input type="text" name='lastname' value={props.lastname}
        onChange = { (e) => {
          props.handleChange(e, 'lastname')
        }}/><br/><br/>
      Select Activity: <br/>
      <select name="Activity" value={props.activityState} 
        onChange={(e) => {props.onActivitySelect(e)}}>
        <option value="Science Lab">Science Lab</option>
        <option value="Cooking">Cooking</option>
        <option value="Painting">Painting</option>
        <option value="Swimming">Swimming</option>
      </select><br/><br/>
    </div>
  )
}

function CheckPrefs(props){
  return(
    <div>
      Check all that apply:<br/>
      <input type="checkbox" name="option" id="diet_id" value="0" 
        checked={props.optionsState[0]}
        onChange={(e) => props.onOptionsChange(e)}/> a) Dietary Restrictions<br/>
      <input type="checkbox" name="option" id="phys_id" value="1" 
        checked={props.optionsState[1]}
        onChange={(e) => props.onOptionsChange(e)}/> b) Physical Disabilities<br/>
      <input type="checkbox" name="option" id="medi_id" value="2" 
        checked={props.optionsState[2]}
        onChange={(e) => props.onOptionsChange(e)}/> c) Medical Needs<br/>
      <br/>
    </div>
  )
}

function SubmitButton(props){
  return(
    <div >
      <input type="button" value="Submit"  onClick = {() => props.addItem()}/>
    </div>
  )
}

function Entry(props){
  return(
    <div>
      <form>
        <Fields handleChange = {props.handleChange} 
          activityState = {props.activityState}
          firstname={props.firstname}
          lastname={props.lastname}
          onActivitySelect = {props.onActivitySelect}/>
        
        <CheckPrefs onOptionsChange = {props.onOptionsChange}
          optionsState = {props.optionsState}/>
        
        <SubmitButton addItem = {props.addItem}/>
      </form>
    </div>
  )
}

function TableRow(props){
  return(
    <div>
      <th>
        <td> <input type="button" value="X"  
               onClick = {() => props.removeItem(props.index)}/></td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.activity}</td>
        <td>{props.restriction}</td>
      </th>
    </div>
  )
}

function TableHeader(props){
  return(
    <div>
      <th>
        <td>Remove</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Activity</td>
        <td>Restrictions</td>
      </th>
    </div>
  )
}

function Data(props){
  return(
    <div>
      <br/>
      <TableHeader/>
      {props.list.map((d, index) =>
        <TableRow index = {index} 
          firstName = {d.firstname} 
          lastName = {d.lastname} 
          activity = {d.activity} 
          restriction = {d.restriction} 
          removeItem = {props.removeItem}/>
      )}
     </div>
  )
      
}

class Preferences extends React.Component{
  constructor(props){
    super(props)  
    this.state = { count: 0,
                  allData: [], 
                  firstname:"", 
                  lastname:"",
                  activity: "Science Lab",
                  options: ["", "", ""]}

  }
  
  onOptionsChange(e){
    var copyItems = this.state.options
    //console.log("option", e.target.value)
    if(copyItems[e.target.value] == "checked"){
      copyItems[e.target.value] = ""
    }else{
      copyItems[e.target.value] = "checked"
    }
    this.setState({options: copyItems})
  }
  
  onActivitySelect(e){
    //console.log("activity selected", e.target.value)
     this.setState({ activity: e.target.value })
  }

  handleChange(e, name){
    //console.log("change", e.target.name)
      if(name == "firstname"){
          this.setState({ firstname: e.target.value })
      }else{
          this.setState({ lastname: e.target.value })
      }
  }
  

  removeItem(index){
    console.log(index, 'remove')
    var itemsCopy = this.state.allData.slice()
    itemsCopy.splice(index,1);
    this.setState({allData:itemsCopy})
  }
  
  addItem(){
    console.log("in add", 
                this.state.firstname, 
                this.state.lastname)
    var restr = ""
    this.state.options.map((d, index) => {
      if(d == "checked"){
        if(index == 0){
          restr+='a'
        }else if(index == 1){
          restr+='b'
        }else if(index == 2){
          restr+='c'
        }
      }
    })
    var itemsCopy = this.state.allData.slice()
    itemsCopy.push({firstname: this.state.firstname, 
                    lastname: this.state.lastname, 
                    activity: this.state.activity, 
                    restriction: restr})
    this.reset()

    this.setState({allData: itemsCopy}) 
    
  }
  
  reset(){
    console.log("in reset")
    this.setState({firstname:"", 
                   lastname:"",
                   activity: "Science Lab",
                   options: ["", "", ""]
                  })
  }
  render(){
    return(
     <div>
       <Entry addItem={this.addItem.bind(this)}
         handleChange= {this.handleChange.bind(this)}
         
         firstname={this.state.firstname}
         lastname={this.state.lastname}
         
         activityState = {this.state.activity}
         optionsState = {this.state.options}
         
         onActivitySelect = {this.onActivitySelect.bind(this)}
         onOptionsChange = {this.onOptionsChange.bind(this)}/>
        
       <Data list={this.state.allData} 
         removeItem = {this.removeItem.bind(this)}/>
     </div>
    )
  }
}


ReactDOM.render(
  <Preferences/>,
  document.getElementById("root")
)


export default Preferences;
