import baseClient from './baseClient';
import serviceBuilder from './serviceBuilder';

const RESOURCE_NAME = '/api/v1/todos';

export default {
  ... serviceBuilder(RESOURCE_NAME)
};
