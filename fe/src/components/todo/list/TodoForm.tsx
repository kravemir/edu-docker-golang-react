import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

export class TodoForm extends Component {
  handleCreate(event) {
    event.preventDefault();

    if(this.props.onCreate) {
      this.props.onCreate({
        "title": this.state.title,
        "content": this.state.content
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
      <form className="form">
        <div className="form-group">
          <textarea className="form-control form-control-sm"
                    name="content"
                    rows="3"
                    placeholder="Content ..."
                    onChange={(e) => this.handleInputChange(e)}
                    />
        </div>
        <button className="btn btn-success" onClick = {(e) => this.handleCreate(e)}>Add</button>
      </form>
    )
  }
}
