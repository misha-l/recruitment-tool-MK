import React, { useState, useEffect } from 'react';
import CandidateDataService from '../../services/CandidateService';

const Candidate = props => {
  const initialCandidateState = {
    _id: null,
    firstName: '',
    lastName: '',
    email: '',
  };
  const [currentCandidate, setCurrentCandidate] = useState(initialCandidateState);
  const [message, setMessage] = useState('');

  const getCandidate = _id => {
    CandidateDataService.get(_id)
      .then(response => {
        setCurrentCandidate(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCandidate(props.match.params._id);
  }, [props.match.params._id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCandidate({ ...currentCandidate, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      _id: currentCandidate._id,
      firstName: currentCandidate.firstName,
      lastName: currentCandidate.lastName,
      email: currentCandidate.email,
    };

    CandidateDataService.update(currentCandidate._id, data)
      .then(response => {
        setCurrentCandidate({ ...currentCandidate, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCandidate = () => {
    CandidateDataService.update(currentCandidate._id, currentCandidate)
      .then(response => {
        console.log(response.data);
        setMessage('The candidate was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCandidate = () => {
    CandidateDataService.remove(currentCandidate._id)
      .then(response => {
        console.log(response.data);
        props.history.push('/candidates');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCandidate ? (
        <div className="edit-form">
          <h4>Candidate</h4>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                _id="firstName"
                required
                value={currentCandidate.firstName}
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
                value={currentCandidate.lastName}
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
                value={currentCandidate.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
          </form>

          <button className="mr-2 badge badge-danger" onClick={deleteCandidate}>
            Delete
          </button>

          <button type="submit" className="badge badge-success" onClick={updateCandidate}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Candidate...</p>
        </div>
      )}
    </div>
  );
};

export default Candidate;
