// about.js

import React from 'react';
import about from './about.jpg'
const About = () => {
  return (
    <div className="container" id="About">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center" style={{ borderRadius: '10rem' }}>
          <img src={about} alt="Company Logo" className="img-fluid" style={{ padding: '5rem', borderRadius: '10rem' }} />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h1 className="mb-4">Generative AI on NLPHub</h1>
            <p>
              From startups to enterprises, organizations trust NLPHub to innovate with
              generative artificial intelligence (AI). With enterprise-grade security and privacy,
              access to industry-leading foundation models, and generative AI-powered applications,
              NLPHub makes it easy to build and scale generative AI, customized for your data, your use cases and your customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
