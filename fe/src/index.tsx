import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import axios from "axios";

import { TodoList, TodoEntry } from "./components/todo/list";

import "./index.scss"

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

render(<App />, document.getElementById("root"))
