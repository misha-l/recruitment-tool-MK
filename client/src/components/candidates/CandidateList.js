import React, { useState, useEffect } from 'react';
import CandidateDataService from '../../services/CandidateService';
import { Link } from 'react-router-dom';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveCandidates();
  }, []);

  const retrieveCandidates = () => {
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

  const setActiveCandidate = (candidate, index) => {
    setCurrentCandidate(candidate);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Candidates List</h4>

        <ul className="list-group">
          {candidates &&
            candidates.map((candidate, index) => (
              <li
                className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveCandidate(candidate, index)}
                key={index}
              >
                {candidate.firstName} {candidate.lastName} <br />
                {candidate.email}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-6">
        {currentCandidate ? (
          <div>
            <h4>Candidate</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentCandidate.firstName} {currentCandidate.lastName}
            </div>
            <div>
              <label>
                <strong>Email address:</strong>
              </label>{' '}
              {currentCandidate.email}
            </div>

            <Link to={'/candidates/' + currentCandidate._id} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a candidate...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;
