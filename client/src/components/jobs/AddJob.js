import React, { useState } from 'react';
import JobDataService from '../../services/JobService';
import { Link } from 'react-router-dom';

const AddJob = () => {
  const initialJobState = {
    _id: null,
    title: '',
    description: '',
    published: false,
  };
  const [job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const saveJob = () => {
    var data = {
      title: job.title,
      description: job.description,
    };

    JobDataService.create(data)
      .then(response => {
        setJob({
          _id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link to={'/jobs/'} className="badge badge-primary" style={{ marginRight: '10px' }}>
            Go back to job list
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              _id="title"
              required
              value={job.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              _id="description"
              required
              value={job.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJob;
