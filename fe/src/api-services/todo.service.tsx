import baseClient from './baseClient';

const RESOURCE_NAME = '/api/v1/todos';

export default {
  getAll() {
    return baseClient.get(RESOURCE_NAME);
  },

  get(id) {
    return baseClient.get(`${RESOURCE_NAME}/${id}`);
  },

  create(data) {
    return baseClient.post(RESOURCE_NAME, data);
  },

  update(id, data) {
    return baseClient.put(`${RESOURCE_NAME}/${id}`, data);
  },

  delete(id) {
    return baseClient.delete(`${RESOURCE_NAME}/${id}`);
  }
};
