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
      <div className="card">
        <div className="card-body">
          <div className="card-title">{this.props.entry.title}</div>
          <div className="card-text">
            <p>{this.props.entry.content}</p>
            <button className="btn btn-danger" onClick = {() => this.handleRemove()}>Remove</button>
          </div>
        </div>
      </div>
    )
  }
}
