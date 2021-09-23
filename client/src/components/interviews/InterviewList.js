import React, { useState, useEffect } from 'react';
import InterviewDataService from '../../services/InterviewService';
import JobDataService from '../../services/JobService';
import CandidateDataService from '../../services/CandidateService';
import { Link } from 'react-router-dom';

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    retrieveInterviews();
    retrieveAllJobs();
    retrieveAllCandidates();
  }, []);

  const retrieveInterviews = () => {
    InterviewDataService.getAll()
      .then(response => {
        setInterviews(response.data);
        console.log(`all interviews`);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const retrieveAllJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(`all jobs`);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const retrieveAllCandidates = () => {
    CandidateDataService.getAll()
      .then(response => {
        setCandidates(response.data);
        console.log(`all candidates`);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const setActiveInterview = (interview, index) => {
    console.log(`interview`);
    console.log(interview);
    console.log(`jobs`);
    console.log(jobs);

    setCurrentInterview(interview);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Interviews List</h4>

        <ul className="list-group">
          {interviews &&
            interviews.map((interview, index) => (
              <li
                className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveInterview(interview, index)}
                key={index}
              >
                {interview.slot}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentInterview ? (
          <div>
            <h4>Interview</h4>
            <div>
              <label>
                <strong>Job:</strong>
              </label>{' '}
              {jobs.map(job => (currentInterview.jobId === job._id ? `${job.title}` : ''))}
            </div>
            <div>
              <label>
                <strong>Candidate:</strong>
              </label>{' '}
              {candidates.map(candidate =>
                currentInterview.candidateId === candidate._id
                  ? `${candidate.firstName} ${candidate.lastName}`
                  : '',
              )}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a interview...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
