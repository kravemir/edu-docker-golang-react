import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

import { TodoForm } from "./TodoForm";
import { TodoEntry } from "./TodoEntry";

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

export class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      entries:
      [
        {
          "id": 1,
          "title": "Implement",
          "content": "Implment it all"
        },
        {
          "id": 2,
          "title": "Check",
          "content": "Check it all"
        }
      ]
    }
  }
  createEntry(e){
    this.props.entryCreator(e)
      .then(response => { this.reloadTodos(); })
      .catch(error => console.log(error));
  }
  removeEntry(id) {
    axios
      .delete("/api/v1/todos/" + id)
      .then(response => { this.reloadTodos(); })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.reloadTodos()
  }
  reloadTodos() {
    this.props.entriesLoader()
      .then(entries => {
        this.setState({entries: entries});
      });
  }
  render() {
    return (
      <div className="todo-list-card">
        <div className="card-header">
          {this.props.listName}
        </div>
        <ul className="todo-list-card-entries">
        {this.state.entries.map((entry, i) => <li key = {entry.id} className="list-group-item">
          <TodoEntry
            entry = {entry}
            onRemove = {() => this.removeEntry(entry.id)}
          />
        </li>)}
        </ul>
        <div className="card-footer">
          <TodoForm onCreate={(e) => this.createEntry(e)}/>
        </div>
      </div>
    )
  }
}
