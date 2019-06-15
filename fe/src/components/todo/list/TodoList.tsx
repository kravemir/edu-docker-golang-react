import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

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
  removeEntry(id) {
    var entries = [...this.state.entries]
    var filteredEntries = entries.filter(e => e.id != id);
    this.setState({entries: filteredEntries})
  }
  componentDidMount() {
    this.reloadTodos()
  }
  reloadTodos() {
    axios
      .get("/api/v1/todos/")
      .then(response => {
        const newTodos = response.data.map(c => {
          return {
            id: c.ID,
            title: c.Title,
            content: c.Content
          };
        });

        this.setState({entries: newTodos});
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="todo-list">
        <div className="todo-list-row">
          {this.state.entries.map((entry, i) => <div key = {i}>
            <TodoEntry
              entry = {entry}
              onRemove = {() => this.removeEntry(entry.id)}
            />
          </div>)}
        </div>
      </div>
    )
  }
}
