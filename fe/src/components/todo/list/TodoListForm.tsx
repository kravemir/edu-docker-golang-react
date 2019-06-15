import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

export class TodoListForm extends Component {
  handleCreate(event) {
    event.preventDefault();

    if(this.props.onCreate) {
      this.props.onCreate({
        "name": this.state.name
      })
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="todo-list-card">
        <div className="card-header">
          Create new todo list
        </div>
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <input type="text" className="form-control" name="name" placeholder="New todo-list name ..." onChange={(e) => this.handleInputChange(e)} />
            </div>
            <button className="btn btn-primary" onClick = {(e) => this.handleCreate(e)}>Create</button>
          </form>
        </div>
      </div>
    )
  }
}
