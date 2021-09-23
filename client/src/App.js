import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './components/Home';

import AddJob from './components/jobs/AddJob';
import Job from './components/jobs/Job';
import JobsList from './components/jobs/JobsList';
import AddJobCandidate from './components/jobs/AddJobCandidate';

import AddCandidate from './components/candidates/AddCandidate';
import Candidate from './components/candidates/Candidate';
import CandidatesList from './components/candidates/CandidateList';

import AddInterview from './components/interviews/AddInterview';
import InterviewList from './components/interviews/InterviewList';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          HR Easy Tool
        </a>
        <div className="mr-auto navbar-nav">
          <li className="nav-item">
            <Link to={'/jobs'} className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add-job'} className="nav-link">
              Add job
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/candidates'} className="nav-link">
              Candidates
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add-candidate'} className="nav-link">
              Add candidate
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add-interview'} className="nav-link">
              Add interview
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/interviews'} className="nav-link">
              Interviews
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/jobs" component={JobsList} />
          <Route exact path="/add-job" component={AddJob} />
          <Route path="/jobs/:_id" component={Job} />
          <Route path="/add-job-candidate/:_id" component={AddJobCandidate} />
          <Route exact path={['/', '/candidates']} component={CandidatesList} />
          <Route exact path="/add-candidate" component={AddCandidate} />
          <Route path="/candidates/:_id" component={Candidate} />
          <Route exact path="/add-interview" component={AddInterview} />
          <Route exact path="/interviews" component={InterviewList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
