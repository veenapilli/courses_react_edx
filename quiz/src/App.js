import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function Data(props){

  var style = {
    width: "40%",
    float: "left",
    margin: "0px 0px 0px 100px"
  } 
  var count = 0; 

  return(
    <div style = {style}> 
      <Question current = {props.current} question = {props.question} />
      {props.options.map((option, index) =>
                         <Options item ={index} current = {props.current} option = {option.o}  handleClick = {props.handleClick} />
                        )} 
    </div>
  )
}

function Question(props){
  var style = {
    color: "red",
    width: "70%",

  } 

  return(
    <div>
      <h2 style = {style}>{props.question.q}</h2>
    </div>
  )
}
function Options (props){
  var style = {
    border: "1px solid gray",
    width: "70%",
    height: "auto",
    minHeight: "60px",
    padding: "20px"
  } 
  return(
    <div  onClick = {() =>props.handleClick(props.current, props.item)}>
      <button style = {style}> {props.option}</button>
    </div>
  )
}
function Status(props){
  var style = {
    width: "40%",
    float: "right",
    margin: "100px 0px 100px 0px"


  } 
  return(
    <div style={style}>
      <h3>Correct: {props.correct}</h3>
      <br/>
      <br/>
      <h3>Incorrect: {props.incorrect}</h3>
    </div>
  )
}

function Completed(props){
  var style = {
    backgroundColor:"teal",
    border: "1px solid gray",
    margin: "auto",
    width: "50%",
    padding: "20px"
  } 
  return(
    <div style = {style}>
      <h1>Status: Completed</h1>
      <h3>Correct: {props.correct}</h3>
      <h3>Incorrect: {props.incorrect}</h3>
      <br/>
      <div onClick = {() =>props.retake()}>
        <button>Re-take</button>
      </div>
    </div>
  )
}

class Assignment extends React.Component{


  constructor (props) {
    super(props)
    this.state = { status: 0, maxQues: 10, question: [{q: 'What is 8*1?'},{q: 'Where does the sun rise?'}, 
                                                      {q: 'What is 0*0?'},{q: 'Which of these can you drink?'}, 
                                                      {q: 'Adult bicycle has how many wheels?'},{q: 'Steering has how many circles?'},
                                                      {q: 'What is the height of Mt. Everest?'},{q: 'What is the weight of a cricket ball?'}, 
                                                      {q: 'What color is blue?'},{q: 'Distance between 10 miles and 1000 miles is?'}],
                  answer: [{a: 0}, {a: 3}, 
                           {a: 2}, {a: 1}, 
                           {a: 2}, {a: 3}, 
                           {a: 0}, {a: 1}, 
                           {a: 3}, {a: 1}], 
                  options: [[{o:"8"}, {o:"4"}, {o:"16"}, {o: "10"}], 
                            [{o:"North"}, {o:"South"}, {o:"West"}, {o: "East"}],
                            [{o:"1"}, {o:"Infinity"}, {o:"0"}, {o: "-1"}], 
                            [{o:"Pizza"}, {o:"Juice"}, {o:"Pasta"}, {o: "Bread"}],
                            [{o:"0"}, {o:"1"}, {o:"2"}, {o: "3"}], 
                            [{o:"18"}, {o:"3"}, {o:"5"}, {o: "1"}],
                            [{o:"8848m"}, {o:"100m"}, {o:"80080m"}, {o: "8km"}],
                            [{o:"100gm"}, {o:"163gm"}, {o:"15kg"}, {o: "19gm"}],
                            [{o:"pink"}, {o:"purple"}, {o:"red"}, {o: "blue"}], 
                            [{o:"999"}, {o:"990"}, {o:"900"}, {o: "989"}],
                           ], current:0, correct:0, incorrect:0}
    this.handleClick = this.handleClick.bind(this)
    this.retake = this.retake.bind(this)

  }


  render(){
    var curr = this.state.current
    if(this.state.status == 0 && this.state.current < this.state.maxQues){
      return(

        <div>

          <Data current = {curr}  question = {this.state.question[curr]} options = {this.state.options[curr]} answer = {this.state.answer[curr]}  handleClick= {this.handleClick} />
          <Status correct={this.state.correct} incorrect={this.state.incorrect}/> 
        </div>
      )
    }else{
      return (
        <div>
          <Completed status= {this.state.status} correct = {this.state.correct} incorrect = {this.state.incorrect} retake = {this.retake} />
        </div>
      )

    }
  }

  retake(){
    this.setState({current:0, correct:0, incorrect:0, status:0})
  }

  handleClick(questionNum, userAns){
    console.log(questionNum + " ans: " + userAns)
    if(this.state.current + 1 == this.state.maxQues){
      console.log("Comp: last Ques")
      if(userAns == this.state.answer[questionNum].a){
        console.log("Comp: corr")
        this.setState({correct: this.state.correct+1, current: this.state.current+1, status: 1}, function(){
          console.log(this.state.status)
        }
                     )
      }else{
        console.log("Comp: incorr")
        this.setState({incorrect: this.state.incorrect+1, current: this.state.current+1, status: 1}, function(){
          console.log(this.state.status)
        })
      }


    }else{
      if(userAns == this.state.answer[questionNum].a){
        this.setState({correct: this.state.correct+1, current: this.state.current+1}, () => {
          console.log("correct")
        }
                     )
      }else{
        this.setState({incorrect: this.state.incorrect+1, current: this.state.current+1}, () => {
          console.log("incorrect")
        })
      }
    }
  }

}

ReactDOM.render(
  <Assignment/>,
  document.getElementById('root')
);


export default Assignment;
