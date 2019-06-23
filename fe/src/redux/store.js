import { init } from "@rematch/core";
import createRematchPersist from "@rematch/persist";
import models from "./models";

const store = init({
  models,
  plugins: [
    createRematchPersist({
      whitelist: ["settings"],
      version: 1
    })
  ]
});

export default store;
