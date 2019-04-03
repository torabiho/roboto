import React, { Component } from 'react';
import './App.css';
// import TodoList from './TodoList'
import TodoItems from './TodoItems';

class App extends Component {
  inputElement = React.createRef()
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
      },
    }
  }
  componentDidMount(){
    this.createTable();
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, e => {
        var key = e.message ? "message" : "data";
        var data = e[key];
        //run function//        
        if(data.key){
          const newItem = data;
          if (newItem.text !== '') {
            const items = [...this.state.items, newItem]
            this.setState({
              items: items,
              currentItem: { text: '', key: '' },
            })
          }
        }
    },false);
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }
  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }
  createTable = async () => {

    try {
    const response = await fetch('http://localhost:8080/livelocation');
    const json = await response.json();
    // this will re render the view with new data
    this.setState({
      vehicles: json[0].recent_coords.map((post, i) => (
        <div key={i+1}>
        <button className="accordion">Vehicle {i+1}
          <img src={'images/check.png'} style={{paddingLeft: '10px'}} width="10px" alt="check" />
        </button>
        <div className="panel">
          <ul className="vehicleInfo__list">
            <li><b>Vehicle ID:</b> KBCD765</li>
            <li><b>Origin:</b> Robarts</li>
            <li><b>Destination:</b> St. George</li>
            <li><b>Departure Time:</b> 8:45 AM</li>
            <li><b>Estimated Arrival Time:</b> 9:05 PM</li>
            <li><b>Material weight:</b> 600 lb</li>
          </ul>
        </div>
      </div>
      ))
    });

    var acc = document.getElementsByClassName("accordion");

    Array.from(acc).forEach((element, i) => {
      element.addEventListener("click", (e) => {
        !e.target.classList.contains('active') && this.iframe.contentWindow.postMessage({selectedVehicle: i+1}, 'http://localhost:3000/map.html');
        e.target.classList.toggle("active");
        var panel = e.target.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      })
    });
  } catch (err) {
    console.log(err);
  }
  }

  render() {
    return (
      <div className="wrapper">
      <div className="topbar">
        <div className="topbar__item logo">RoboTO</div>
        <div className="topbar__item">Monitor a Vehicle</div>
        <div className="topbar__item">Add vehicle</div>
        <div className="topbar__item">Schedule a trip</div>
      </div>
      <div className="App">
        <div className="vehicleSelector__container">
          <h1 className="map__title">Select a vehicle</h1>
          {this.state.vehicles}
        </div>
        <div className="map__container">
          <div className="map__header__container"><h1 className="map__title">Live Map</h1>
          <p>Find real time locations of your vehicle in your fleet below</p>
          {/* <TodoList
            addItem={this.addItem}
            inputElement={this.inputElement}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
          /> */}
          </div>
          <iframe ref={(node)=> this.iframe = node} title='map' src="map.html" width="100%" height="680px" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
        </div>
        <div className="info__container">
          <div className="alerts__container">
            <h1>Alerts</h1>
            <div className={`alerts__number ${this.state.items.length > 0 ? 'red' : 'green' }`}>{this.state.items.length > 0 ? this.state.items.length : <img src={'images/check.png'} width="70%" alt="check" />}</div>
            <div className={this.state.items.length > 0 ? 'alert__description' : 'alert__placeholder' }>{this.state.items.length > 0 ? <TodoItems entries={this.state.items} deleteItem={this.deleteItem} /> : 'Vehicle is on track!'}</div>
          </div>
          <div className="vehicleInfo__container">
            <h1>Vehicle Information</h1>
            <ul className="vehicleInfo__list">
              <li><b>Vehicle ID:</b> KBCD765</li>
              <li><b>Origin:</b> Robarts</li>
              <li><b>Destination:</b> St. George</li>
              <li><b>Departure Time:</b> 8:45 AM</li>
              <li><b>Estimated Arrival Time:</b> 9:05 PM</li>
              <li><b>Material weight:</b> 600 lb</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default App