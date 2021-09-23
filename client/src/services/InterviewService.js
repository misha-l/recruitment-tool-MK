import http from '../http-common';

const getAll = () => {
  return http.get('/interviews');
};

const get = _id => {
  return http.get(`/interviews/${_id}`);
};

const create = data => {
  return http.post('/interviews', data);
};

const update = (_id, data) => {
  const { jobId, candidateId, slot } = { ...data };
  return http.put(`/interviews/${_id}`, { jobId, candidateId, slot });
};

const remove = _id => {
  return http.delete(`/interviews/${_id}`);
};

const removeAll = () => {
  return http.delete(`/interviews`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
