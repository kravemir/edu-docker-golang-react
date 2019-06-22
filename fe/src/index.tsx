import * as React from "react"
import { BrowserRouter, Link, Route } from "react-router-dom";
import { render } from "react-dom"

import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";

import "./index.scss"

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="siteHeader">
          <ul className="navigation">
            <li><Link to="/">Home</Link></li>
            <li className="spacer"></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
        <Route exact path="/" component={HomePage} />
        <Route path="/settings" component={SettingsPage} />
      </div>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"))
