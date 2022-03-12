import { computeHeadingLevel } from '@testing-library/react';
import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';

import { getLocationTemp } from './data.js';

//const API_KEY = 'cbf05118315d2e7511acaabd788a6f6e';
const API_KEY = 'a32e09408b19b9291cc63904a0ba4e3e';

// Weather component (main component)
class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loadAllowed: true,
        currentLocation: "Los Angeles",
        unitType: "imperial",
        tempData: [],
    }

  }

  async fetchData() {
    let location = this.state.currentLocation;
    let unitType = this.state.unitType;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitType}&appid=${API_KEY}`, {mode: 'cors'});
    const data = await response.json();
    this.setState({tempData: data.main});
    console.log("API Call")
  }

  async componentDidMount() {
    await this.fetchData();
  }

  /*
  async componentDidUpdate() {
    if (this.state.loadNew) {
      await this.fetchData();
    } else {
      console.log("Api call blocked!");
    }
    
  }
  */

  async handleClick(location) {
    
    this.setState({
      currentLocation: location,
    })
    await this.fetchData();

  }

  render() {

    return (
      
      <div>
        <div>
          <LocationForm
            onClick = {(location) =>this.handleClick(location)}
          />
        </div>


        <div>
          <Title 
            title = {this.state.currentLocation}
          />
        </div>

          <div>
            <TempInfo
              temp = {this.state.tempData.temp}
            />
          </div>
      </div>

    );

  }

}

// LocationForm component
class LocationForm extends React.Component {
  
  constructor(props) {
    super(props);
  }

  getInputValue() {

    let inputValue = document.getElementById("locationInput").value;
    return inputValue;

  }

  

  render() {
    return (
    <div>
        <input type = "text" id = "locationInput"/>
        <button 
          onClick={() => this.props.onClick(this.getInputValue())}
        >Click
        </button>
    </div>
    )
  }
  

}


// Title component
class Title extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>
          Weather
        </p>
        <p>
          {this.props.title}
        </p>
    </div>
    )
  }

}


// TempInfo component
class TempInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(

      <div>
        <p>
          {this.props.temp}
        </p>
      </div>

    )
  }

}








// =============================

reactDom.render(
  <Weather />,
  document.getElementById('root')
)