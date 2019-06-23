import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import { Card, ListGroup } from "react-bootstrap";

import TodoService from "../../../api-services/todo.service";

import { TodoForm } from "./TodoForm";
import { TodoEntry } from "./TodoEntry";

function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

export class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      entries: [
        {
          id: 1,
          title: "Implement",
          content: "Implment it all"
        },
        {
          id: 2,
          title: "Check",
          content: "Check it all"
        }
      ]
    };
  }
  createEntry(e) {
    return this.props
      .entryCreator(e)
      .then(response => {
        this.reloadTodos();
      })
      .catch(error => console.log(error));
  }
  removeEntry(id) {
    TodoService.delete(id)
      .then(response => {
        this.reloadTodos();
      })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.reloadTodos();
  }
  reloadTodos() {
    this.props.entriesLoader().then(entries => {
      this.setState({ entries: entries });
    });
  }
  render() {
    return (
      <Card className="todo-list-card">
        <Card.Header>{this.props.listName}</Card.Header>
        <ListGroup className="todo-list-card-entries" variant="flush">
          {this.state.entries.map((entry, i) => (
            <ListGroup.Item key={entry.id}>
              <TodoEntry
                entry={entry}
                onRemove={() => this.removeEntry(entry.id)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Footer>
          <TodoForm onCreate={e => this.createEntry(e)} />
        </Card.Footer>
      </Card>
    );
  }
}
