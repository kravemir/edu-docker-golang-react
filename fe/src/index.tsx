import * as React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "react-dom";

import store from "./redux/store";

import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";

import "./index.scss";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <div className="siteHeader">
            <ul className="navigation">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="spacer" />
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={HomePage} />
          <Route path="/settings" component={SettingsPage} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
