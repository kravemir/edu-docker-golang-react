import * as React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { getPersistor } from "@rematch/persist";
import { render } from "react-dom";

import store from "./redux/store";

import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";

import "./index.scss";

function updateHtmlStyle() {
  const { density, theme } = store.getState().settings;
  document.documentElement.className = `bootstrap-scope ${theme}`;
}

store.subscribe(updateHtmlStyle);
updateHtmlStyle();

const persistor = getPersistor();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
