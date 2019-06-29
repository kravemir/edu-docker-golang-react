import * as React from "react";
import { Component } from "react";

import ListService from "../api-services/list.service";
import TodoService from "../api-services/todo.service";

import { TodoList, TodoListForm } from "../components/todo/list";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    };
  }
  componentDidMount() {
    this.reloadLists();
  }
  createList(l) {
    return ListService.create(l)
      .then(response => {
        this.reloadLists();
      })
      .catch(error => console.log(error));
  }
  removeList(l) {
    ListService.delete(l.id)
      .then(response => {
        this.reloadLists();
      })
      .catch(error => console.log(error));
  }
  reloadLists() {
    ListService.getAll()
      .then(newLists => {
        this.setState({ entries: newLists });
      })
      .catch(error => console.log(error));
  }
  loadTodosForList(listId) {
    return ListService.todos(listId).catch(error => console.log(error));
  }
  createEntry(listId, e) {
    return TodoService.create({ listId, content: e.content }).catch(error =>
      console.log(error)
    );
  }
  render() {
    return (
      <div className="page-content container">
        {this.state.entries.map((list, i) => (
          <div key={list.id}>
            <TodoList
              listName={list.name}
              entriesLoader={() => this.loadTodosForList(list.id)}
              entryCreator={e => this.createEntry(list.id, e)}
              onRemove={() => this.removeList(list)}
            />
          </div>
        ))}
        <TodoListForm onCreate={l => this.createList(l)} />
      </div>
    );
  }
}

export default HomePage;
