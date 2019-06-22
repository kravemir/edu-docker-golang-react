import baseClient from './baseClient';

export default (resourceName) => ({
  getAll() {
    return baseClient.get(resourceName);
  },

  get(id) {
    return baseClient.get(`${resourceName}/${id}`);
  },

  create(data) {
    return baseClient.post(resourceName, data);
  },

  update(id, data) {
    return baseClient.put(`${resourceName}/${id}`, data);
  },

  delete(id) {
    return baseClient.delete(`${resourceName}/${id}`);
  }
});
