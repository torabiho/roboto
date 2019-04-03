import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li key={item.key} onClick={() => this.props.deleteItem(item.key)}>
        <div>{item.text}</div>
        <div>{item.key}</div>
      </li>
    )
  }

  createGroups = (group, index) => {
    const groupName = group.name;
    const selectedVehicle = this.props.selectedVehicle;    
    const groupItems = group.entries.length > 0 && group.entries.map(this.createTasks);
    
    return(
      (groupItems && (selectedVehicle === -1 || selectedVehicle === index)) && <div key={index}><h2>{groupName}</h2><ul className="theList">{groupItems}</ul></div>
    );
  }

  render() {
    const todoEntries = this.props.entries;    
    const listItems = todoEntries.map(this.createGroups)

    return <div className="alerts">{listItems}</div>
  }
}

export default TodoItems