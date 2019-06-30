import * as React from "react";
import { Component } from "react";
import { Card, ListGroup } from "react-bootstrap";

import TodoService from "../../../api-services/todo.service";

import { TodoForm } from "./TodoForm";
import { TodoEntry } from "./TodoEntry";

export class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
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
  handleRemove() {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }
  render() {
    const cardBody = () => {
      if (this.state.entries && this.state.entries.length > 0) {
        return (
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
        );
      } else {
        return (
          <div className="text-muted">
            The list is empty, use form below to add entries ...
          </div>
        );
      }
    };

    return (
      <Card className="todo-list-card">
        <Card.Header>
          <div className="d-flex align-items-center">
            <div className="mr-auto">{this.props.listName}</div>
            <div>
              <button
                className="btn btn-link btn-icon text-danger"
                onClick={() => this.handleRemove()}
              >
                <i className="material-icons">remove</i>
                <span>remove</span>
              </button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>{cardBody()}</Card.Body>
        <Card.Footer>
          <TodoForm onCreate={e => this.createEntry(e)} />
        </Card.Footer>
      </Card>
    );
  }
}
