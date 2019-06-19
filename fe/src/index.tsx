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
    return axios
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
  loadTodosForList(listId) {
    var base;

    base = axios.get("/api/v1/lists/"+listId+"/todos/");

    return base
      .then(response => {
        const newTodos = response.data.map(c => {
          return {
            id: c.ID,
            title: c.Title,
            content: c.Content
          };
        });

        return newTodos;
      })
      .catch(error => console.log(error));
  }
  createEntry(listId, e){
    console.log("%o %o", listId, e);
    return axios
      .post("/api/v1/todos", {
        "Title": e.title,
        "Content": e.content,
        "ListID": listId
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
            entriesLoader = {() => this.loadTodosForList(list.id)}
            entryCreator = {(e) => this.createEntry(list.id, e)}
            onRemove = {() => this.removeEntry(entry.id)}
          />
        </div>)}
        <TodoListForm onCreate={(l) => this.createList(l)}/>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"))
