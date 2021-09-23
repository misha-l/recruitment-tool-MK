import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/JobService';
import CandidateDataService from '../../services/CandidateService';
import InterviewDataService from '../../services/InterviewService';
import { Link } from 'react-router-dom';

const AddInterview = props => {
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [candidateId, setCandidateId] = useState('');
  const [message, setMessage] = useState('');
  const [slot, setSlotId] = useState(0);

  useEffect(() => {
    retrieveCandidates();
    console.log('All Interviews');
  }, []);

  useEffect(() => {
    retrieveJobs();
  }, []);

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(`job`);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCandidates = () => {
    CandidateDataService.getAll()
      .then(response => {
        setCandidates(response.data);
        console.log(`candidate`);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleJobChange = event => {
    const { name, value } = event.target;
    console.log('Event: ', name, value);
    setJobId(value);
  };

  const handleCandidateChange = event => {
    const { name, value } = event.target;
    console.log('Event: ', name, value);
    setCandidateId(value);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSlotId(value);
  };

  const addJobInterview = () => {
    console.log('addJobInterview: ', jobId, candidateId, slot);

    InterviewDataService.create({ jobId, candidateId, slot })
      .then(response => {
        console.log(`i`);
        console.log(response.data);
        setMessage('The interview was successfully added to the job!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Add iterview</h1>
      <div className="edit-form">
        <form>
          <select name="job" onChange={handleJobChange} required>
            <option key="0">please select a job</option>
            {jobs.map((job, index) => (
              <option key={index} value={job._id}>
                {job.title}
              </option>
            ))}
          </select>
          <select name="candidate" onChange={handleCandidateChange} required>
            <option key="0">please select a candidate to add</option>
            {candidates.map((candidate, index) => (
              <option key={index} value={candidate._id}>
                {candidate.firstName} {candidate.lastName}
              </option>
            ))}
          </select>
          <div className="form-group">
            <label htmlFor="description">Slot</label>
            <input
              type="text"
              className="form-control"
              _id="description"
              name="description"
              value={slot}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button type="submit" className="badge badge-success" onClick={addJobInterview}>
          Add interview
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AddInterview;
