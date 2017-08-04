import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';

const cars = [
  {y: '2013', m: 'A', p: '$32000', l: ''}, 
  {y: '2011', m: 'B', p: '$4400', l: ''},
  {y: '2016', m: 'B', p: '$15500', l: ''}];
const trucks = [
  {y: '2014', m: 'D', p: '$18000', l: ''}, 
  {y: '2013', m: 'E', p: '$5200', l: ''}];
  
const convertibles = [
  {y: '2009', m: 'F', p: '$2000', l: ''}, 
  {y: '2010', m: 'G', p: '$6000', l: ''},
  {y: '2012', m: 'H', p: '$12500', l: ''},
  {y: '2017', m: 'M', p: '$50000', l: ''}];
  
const types = ['All', 'Cars', 'Trucks', 'Convertibles'];

function TransportationApp(){
  return(
    <div>
      <TransportationHeader/>
      <TransportationOptions options = {types}/>
      <TransportationList title='Cars' allData = {cars}/>
      <TransportationList title='Trucks' allData = {trucks}/>
      <TransportationList title='Convertibles' allData = {convertibles}/>
    </div>
  )  
}

function TransportationHeader(props){
  return(
    <div>
      <h1>Welcome to React Transportation</h1>
      <h2>The best place to buy vehicles online</h2>
      <br/>
    </div>
  )
}

function TransportationOptions(props){
  return(
    <div>
      <h3>Choose Options</h3>
      New Only <input type="checkbox" name="vehicle"/>
      <br/>
      <br/>
      Select Type <select>
        {props.options.map((option)=>
                          <option value={option}>{option}</option>
        )}
        </select>
      <br/>
    </div>
  )
}

function TransportationList(props){
  return(
    <div>
      <h3>{props.title}</h3>      
      {props.allData.map((data) =>
        <TransportationItem y = {data.y} m = {data.m} p = {data.p} />
      )}
    </div>
  )
}

function TransportationItem(props){
  return(
    <div>
      <table>
        <tbody>
      <tr>
        <TableHeader yearTag = 'Year' modelTag = 'Model' priceTag = 'Price' buyTag = 'Buy'/>
        <TableRow y = {props.y} m = {props.m} p = {props.p} l = {props.l}/>
        </tr>
        </tbody>
      </table>
      <br/>
    </div>
  )
}

function TableHeader(props){
  return(
    <div>
      <th>
        <td>{props.yearTag}</td>
        <td>{props.modelTag}</td>
        <td>{props.priceTag}</td>
        <td>{props.buyTag}</td>
      </th>
    </div>
  )
}

function TableRow(props){
  return(
    <div>
      <tr>
        <td>{props.y}</td>
        <td>{props.m}</td>
        <td>{props.p}</td>
        <td><BuyButton link = {props.l}/></td>
      </tr>
    </div>
  )
}

function BuyButton(props){
  return (
    <button type="button" className="button_buy">Buy Now</button>
  )
}

ReactDOM.render(
  <div>
    <TransportationApp/>
  </div>,
  document.getElementById("root")
)


export default TransportationApp;
