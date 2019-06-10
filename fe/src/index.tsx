import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
// import "./index.css"

class App extends Component {
  render() {
    return (
      <div>
        <h1>todo list: docker go react</h1>
        <TodoList/>
      </div>
    )
  }
}

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      entries:
      [
        {
          "id": 1,
          "title": "Implement",
          "content": "Implment it all"
        },
        {
          "id": 2,
          "title": "Check",
          "content": "Check it all"
        }
      ]
    }
  }
  removeEntry(id) {
    var entries = [...this.state.entries]
    var filteredEntries = entries.filter(e => e.id != id);
    this.setState({entries: filteredEntries})
  }
  render() {
    return (
      <ul>
        {this.state.entries.map((entry, i) => <TodoEntry
          key = {entry.id}
          entry = {entry}
          onRemove = {() => this.removeEntry(entry.id)}
        />)}
      </ul>
    )
  }
}

class TodoEntry extends Component {
  handleRemove() {
    if(this.props.onRemove) {
      this.props.onRemove()
    }
  }
  render() {
    return (
      <li><table><tbody><tr>
        <td>
          <div>{this.props.entry.title}</div>
          <div>{this.props.entry.content}</div>
        </td>
        <td>
          <button onClick = {() => this.handleRemove()}>Remove</button>
        </td>
      </tr></tbody></table></li>
    )
  }
}

render(<App />, document.getElementById("root"))
