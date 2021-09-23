import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/JobService';
import { Link } from 'react-router-dom';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  // list does not contain candidates, so a separate api call is necessary
  const initialJobDetails = {
    _id: null,
    title: '',
    description: '',
    candidates: [],
  };
  const [currentJobDetails, setCurrentJobDetails] = useState(initialJobDetails);

  useEffect(() => {
    retrieveJobs();
    console.log('All Jobs');
  }, []);

  const getJobDetails = _id => {
    JobDataService.get(_id)
      .then(response => {
        console.log('CurrentJobDetails: ', response.data);
        setCurrentJobDetails(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveJobs();
    setCurrentJob(null);
    setCurrentJobDetails(initialJobDetails);
    setCurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
    getJobDetails(job._id);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Jobs List</h4>

        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentJob.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{' '}
              {currentJob.description}
            </div>

            <Link
              to={'/jobs/' + currentJob._id}
              className="badge badge-warning"
              style={{ marginRight: '10px' }}
            >
              Edit
            </Link>

            <Link
              to={'/add-job-candidate/' + currentJob._id}
              className="badge badge-primary"
              style={{ marginRight: '10px' }}
            >
              Add job candidate
            </Link>

            {currentJobDetails.candidates && currentJobDetails.candidates.length ? (
              <>
                <h5>{currentJobDetails.candidates.length} candidates:</h5>
                <ul>
                  {currentJobDetails.candidates.map((candidate, index) => (
                    <>
                      <li key={index}>
                        {candidate.firstName} {candidate.lastName}
                      </li>
                      <button>add interview</button>
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <h5>No candidates for this job</h5>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
