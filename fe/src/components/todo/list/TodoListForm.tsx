import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

export class TodoListForm extends Component {
  render() {
    return (
      <div className="todo-list-card">
        <div class="card-header">
          Create new todo list
        </div>
        <div class="card-body">
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
