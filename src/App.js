import React, { Component } from 'react'
import './App.css'
import TodoList from './TodoList'
import TodoItems from './TodoItems'

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
  render() {
    return (
      <div className="wrapper">
      <div className="topbar">RoboTO</div>
      <div className="App">
        <div className="map__container">
          <div className="map__header__container"><h1 className="map__title">Live Map</h1><TodoList
            addItem={this.addItem}
            inputElement={this.inputElement}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
          /></div>
          <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369484.52058328013!2d-79.60103278135236!3d43.65653529382275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C+ON!5e0!3m2!1sen!2sca!4v1551834484898" width="100%" height="680px" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
        </div>
        <div className="info__container">
          <div className="alerts__container">
            <h1>Alerts</h1>
            <div className={`alerts__number ${this.state.items.length > 0 ? 'red' : 'green' }`}>{this.state.items.length > 0 ? this.state.items.length : <img src={'images/check.png'} width="70%" alt="check" />}</div>
            <p className={this.state.items.length > 0 ? 'alert__description' : '' }>{this.state.items.length > 0 ? <TodoItems entries={this.state.items} deleteItem={this.deleteItem} /> : 'Vehicle is on track!'}</p>
          </div>
          <div className="vehicleInfo__container">
            <h1>Vehicle Information</h1>
            <ul className="vehicleInfo__list">
              <li><b>Vehicle ID:</b> KBCD765</li>
              <li><b>Origin:</b> Toronto</li>
              <li><b>Destination:</b> Ottawa</li>
              <li><b>Departure Time:</b> 8:45 AM</li>
              <li><b>Estimated Arrival Time:</b> 12:55 PM</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default App