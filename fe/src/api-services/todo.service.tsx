import baseClient from "./baseClient";
import serviceBuilder from "./serviceBuilder";
import * as t from "./transforms";

const RESOURCE_NAME = "/api/v1/todos";

export default {
  ...serviceBuilder(RESOURCE_NAME, t.todoToModel, t.todoToDto)
};
