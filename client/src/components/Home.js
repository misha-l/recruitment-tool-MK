import React, { useState, useEffect } from 'react';
import JobsList from '../components/jobs/JobsList';
import CandidatesList from '../components/candidates/CandidateList';
import InterviewList from '../components/interviews/InterviewList';

const Home = () => {
  return (
    <div className="home">
      <JobsList />
      <hr />
      <CandidatesList />
      <hr />
      <InterviewList />
    </div>
  );
};

export default Home;
