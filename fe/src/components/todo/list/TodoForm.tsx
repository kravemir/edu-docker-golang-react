import * as React from "react";
import { Component } from "react";

function getInvalidFields(formElements) {
  return Array.prototype.slice
    .call(formElements)
    .filter(elem => elem.name.length > 0)
    .filter(elem => !elem.checkValidity())
    .map(elem => elem.name);
}

export class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      formState: "clean",
      content: "",
      invalidFields: []
    };
  }
  onSubmit(event) {
    event.preventDefault();

    this.setState({ formState: "submitted" });

    const invalidFields = getInvalidFields(event.target.elements);

    this.setState({ invalidFields: invalidFields });

    if (invalidFields.length === 0 && this.props.onCreate) {
      this.props
        .onCreate({
          title: this.state.title,
          content: this.state.content
        })
        .then(result => {
          this.setState({
            formState: "clean",
            content: "",
            invalidFields: []
          });
        });
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <form
        className={
          "form" + (this.state.formState != "clean" ? " was-validated" : "")
        }
        onSubmit={e => this.onSubmit(e)}
        noValidate
      >
        <div className="form-group">
          <textarea
            className={`form-control form-control-sm ${
              this.state.invalidFields.some(e => e === "content")
                ? "is-invalid"
                : ""
            }`}
            name="content"
            rows={3}
            placeholder="Content ..."
            required={true}
            value={this.state.content}
            onChange={e => this.handleInputChange(e)}
          />
          <div className="invalid-feedback">Please enter entry content.</div>
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    );
  }
}
