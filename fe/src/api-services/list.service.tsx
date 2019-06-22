import baseClient from './baseClient';
import serviceBuilder from './serviceBuilder';

const RESOURCE_NAME = '/api/v1/lists';

export default {
  ... serviceBuilder(RESOURCE_NAME),

  todos(id) {
    return baseClient.get(`${RESOURCE_NAME}/${id}/todos/`);
  }
};
