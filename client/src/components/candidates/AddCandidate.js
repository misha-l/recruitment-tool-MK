import React, { useState } from 'react';
import CandidateDataService from '../../services/CandidateService';

const AddCandidate = () => {
  const initialCandidateState = {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
  };
  const [candidate, setCandidate] = useState(initialCandidateState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const saveCandidate = () => {
    var data = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
    };

    CandidateDataService.create(data)
      .then(response => {
        setCandidate({
          _id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
        setSubmitted(true);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCandidate = () => {
    setCandidate(initialCandidateState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCandidate}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              _id="firstName"
              required
              value={candidate.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              _id="lastName"
              required
              value={candidate.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              className="form-control"
              _id="email"
              required
              value={candidate.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <button onClick={saveCandidate} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCandidate;
