import React, { useState, useEffect } from 'react';
import JobDataService from '../../services/JobService';
import CandidateDataService from '../../services/CandidateService';
import { Link } from 'react-router-dom';

const AddJobCandidate = props => {
  const initialJobState = {
    _id: null,
    title: '',
    description: '',
  };
  const [jobData, setCurrentJob] = useState(initialJobState);
  const [candidates, setCandidates] = useState([]);
  const [candidateId, setCandidateId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getJob(props.match.params._id);
  }, [props.match.params._id]);

  useEffect(() => {
    retrieveCandidates();
  }, []);

  const getJob = _id => {
    console.log('getJobId: ', _id);
    JobDataService.get(_id)
      .then(response => {
        // console.log('response.data: ', response.data);
        setCurrentJob(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCandidates = () => {
    CandidateDataService.getAll()
      .then(response => {
        setCandidates(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    console.log('Event: ', name, value);
    setCandidateId(value);
  };

  const addJobCandidate = () => {
    console.log('addJobCandidate: ', jobData._id, candidateId);
    JobDataService.addJobCandidate(jobData._id, candidateId)
      .then(response => {
        console.log(response.data);
        setMessage('The candidate was successfully added to the job!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Add job candidate</h1>
      <h4>for job {jobData.title}</h4>
      <div className="edit-form">
        <form>
          <select name="candidate" onChange={handleChange} required>
            <option key="0">please select a candidate to add</option>
            {candidates.map((candidate, index) => (
              <option key={index} value={candidate._id}>
                {candidate.firstName} {candidate.lastName}
              </option>
            ))}
          </select>
        </form>
        <button type="submit" className="badge badge-success" onClick={addJobCandidate}>
          Add candidate
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AddJobCandidate;
