import http from '../http-common';

const getAll = () => {
  return http.get('/jobs');
};

const get = _id => {
  return http.get(`/jobs/${_id}`);
};

const create = data => {
  return http.post('/jobs', data);
};

const update = (_id, data) => {
  const { title, description } = { ...data };
  console.log('update: ', { title, description });
  return http.put(`/jobs/${_id}`, { title, description });
};

const remove = _id => {
  return http.delete(`/jobs/${_id}`);
};

const removeAll = () => {
  return http.delete(`/jobs`);
};

const findByTitle = title => {
  return http.get(`/jobs?title=${title}`);
};

const addJobCandidate = (_id, candidateId) => {
  return http.post(`/jobs/${_id}/candidates`, { candidateId });
};

const removeJobCandidate = (_id, candidateId) => {
  return http.delete(`/jobs/${_id}/candidates/${candidateId}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  addJobCandidate,
  removeJobCandidate,
};
