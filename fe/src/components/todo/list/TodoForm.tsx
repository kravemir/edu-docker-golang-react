import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"

function checkAllFieldsValid(formElements) {
  return !Array.prototype.slice.call(formElements)
    .filter(elem => elem.name.length > 0)
    .some(field => !field.checkValidity());
}

export class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      "formState": "clean",
      "content": ""
    }
  }
  onSubmit(event) {
    event.preventDefault();

    this.setState({ "formState": "submitted" });

    const allFieldsValid = checkAllFieldsValid(event.target.elements);

    if (allFieldsValid && this.props.onCreate) {
      this.props.onCreate({
        "title": this.state.title,
        "content": this.state.content
      }).then(result => {
        this.setState({
          "formState": "clean",
          "content": ""
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
      <form className={"form" + (this.state.formState != "clean" ? " was-validated" : "")} onSubmit={(e) => this.onSubmit(e)} noValidate>
        <div className="form-group">
          <textarea className="form-control form-control-sm"
            name="content"
            rows={3}
            placeholder="Content ..."
            required={true}
            value={this.state.content}
            onChange={(e) => this.handleInputChange(e)}
          />
          <div className="invalid-feedback">
            Please enter entry content.
          </div>
        </div>
        <button className="btn btn-success">Add</button>
      </form>
    )
  }
}
