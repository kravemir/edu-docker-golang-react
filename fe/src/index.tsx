import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { getPersistor } from "@rematch/persist";
import { render } from "react-dom";

import store from "./redux/store";

import Navigation from "./blocks/navigation";
import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";

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
          <Navigation />
          <Route exact path="/" component={HomePage} />
          <Route path="/settings" component={SettingsPage} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
