import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/JobService';

const Job = props => {
  const initialJobState = {
    _id: null,
    title: '',
    description: '',
    published: false,
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState('');

  const getJob = _id => {
    JobDataService.get(_id)
      .then(response => {
        setCurrentJob(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(props.match.params._id);
  }, [props.match.params._id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      _id: currentJob._id,
      title: currentJob.title,
      description: currentJob.description,
      published: status,
    };

    JobDataService.update(currentJob._id, data)
      .then(response => {
        setCurrentJob({ ...currentJob, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateJob = () => {
    JobDataService.update(currentJob._id, currentJob)
      .then(response => {
        console.log(response.data);
        setMessage('The job was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteJob = () => {
    JobDataService.remove(currentJob._id)
      .then(response => {
        console.log(response.data);
        props.history.push('/jobs');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentJob ? (
        <div className="edit-form">
          <h4>Job</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                _id="title"
                name="title"
                value={currentJob.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                _id="description"
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="mr-2 badge badge-danger" onClick={deleteJob}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updateJob}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default Job;
