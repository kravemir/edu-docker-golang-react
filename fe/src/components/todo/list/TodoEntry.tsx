import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

export class TodoEntry extends Component {
  handleRemove() {
    if(this.props.onRemove) {
      this.props.onRemove()
    }
  }
  render() {
    return (
      <div className="todo-list-entry">
        <div className="content">{this.props.entry.content}</div>
        <div className="buttons">
          <button className="btn btn-link text-danger" onClick = {() => this.handleRemove()}>Remove</button>
        </div>
      </div>
    )
  }
}
