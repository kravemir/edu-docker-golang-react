import baseClient from "./baseClient";

export default (resourceName, dtoToModel, modelToDto) => ({
  getAll() {
    return baseClient
      .get(resourceName)
      .then(response => response.data.map(dtoToModel));
  },

  get(id: number) {
    return baseClient
      .get(`${resourceName}/${id}`)
      .then(response => dtoToModel(response.data));
  },

  create(data) {
    return baseClient
      .post(resourceName, modelToDto(data))
      .then(response => dtoToModel(response.data));
  },

  update(id: number, data) {
    return baseClient
      .put(`${resourceName}/${id}`, modelToDto(data))
      .then(response => dtoToModel(response.data));
  },

  delete(id) {
    return baseClient.delete(`${resourceName}/${id}`);
  }
});
