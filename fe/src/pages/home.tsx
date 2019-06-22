import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"

import ListService from "../api-services/list.service";
import TodoService from "../api-services/todo.service";

import { TodoList, TodoListForm } from "../components/todo/list";

class HomePage extends Component {
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
    return ListService.create({
        "Name": l.name
      })
      .then(response => { this.reloadLists(); })
      .catch(error => console.log(error));
  }
  reloadLists() {
    ListService.getAll()
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

    base = ListService.todos(listId);

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
    return TodoService.create({
        "Title": e.title,
        "Content": e.content,
        "ListID": listId
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="page-content">
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

export default HomePage;
