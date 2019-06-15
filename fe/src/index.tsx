import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

import { TodoList, TodoListForm } from "./components/todo/list";

import "./index.scss"

class App extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    }
  }
  componentDidMount() {
    this.reloadLists()
  }
  createList(l){
    axios
      .post("/api/v1/lists", {
        "Name": l.name
      })
      .then(response => { this.reloadLists(); })
      .catch(error => console.log(error));
  }
  reloadLists() {
    axios
      .get("/api/v1/lists/")
      .then(response => {
        const newLists = response.data.map(c => {
          return {
            id: c.ID,
            name: c.Name
          };
        });

        this.setState({entries: newLists});
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div>
        <div className="siteHeader"><h1>todo list: docker go react</h1></div>
        {this.state.entries.map((list, i) => <div key = {list.id}>
          <TodoList
            listName = {list.name}
            onRemove = {() => this.removeEntry(entry.id)}
          />
        </div>)}
        <TodoListForm onCreate={(l) => this.createList(l)}/>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"))
