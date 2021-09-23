import http from '../http-common';

const getAll = () => {
  return http.get('/candidates');
};

const get = _id => {
  return http.get(`/candidates/${_id}`);
};

const create = data => {
  return http.post('/candidates', data);
};

const update = (_id, data) => {
  const { firstName, lastName, email } = { ...data };
  console.log('update: ', { firstName, lastName, email });
  return http.put(`/candidates/${_id}`, { firstName, lastName, email });
};

const remove = _id => {
  return http.delete(`/candidates/${_id}`);
};

const removeAll = () => {
  return http.delete(`/candidates`);
};

const findByTitle = title => {
  return http.get(`/candidates?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
