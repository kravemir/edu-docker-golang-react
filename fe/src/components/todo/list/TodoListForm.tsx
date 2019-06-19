import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

function checkAllFieldsValid(formElements) {
  return !Array.prototype.slice.call(formElements)
    .filter(elem => elem.name.length > 0)
    .some(field => !field.checkValidity());
}

export class TodoListForm extends Component {
  constructor() {
    super();

    this.state = {
      "formState": "clean",
      "name": ""
    }
  }
  onSubmit(event) {
    event.preventDefault();

    this.setState({ "formState": "submitted" });

    const allFieldsValid = checkAllFieldsValid(event.target.elements);

    if (allFieldsValid && this.props.onCreate) {
      this.props.onCreate({
        "name": this.state.name
      }).then(result => {
        this.setState({
          "formState": "clean",
          "name": ""
        });
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
          <form className={"form" + (this.state.formState != "clean" ? " was-validated" : "")} onSubmit={(e) => this.onSubmit(e)} noValidate>
            <div className="form-group">
              <input type="text" value={this.state.name} className="form-control" name="name" placeholder="New todo-list name ..." onChange={(e) => this.handleInputChange(e)} required />
              <div className="invalid-feedback">
                Please enter list name.
              </div>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    )
  }
}
