import baseClient from "./baseClient";
import serviceBuilder from "./serviceBuilder";
import * as t from "./transforms";

const RESOURCE_NAME = "/api/v1/lists";

export default {
  ...serviceBuilder(RESOURCE_NAME, t.listToModel, t.listToDto),

  todos(id) {
    return baseClient
      .get(`${RESOURCE_NAME}/${id}/todos/`)
      .then(response => response.data.map(t.todoToModel));
  }
};
