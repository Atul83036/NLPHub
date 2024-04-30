
import logo2 from './logo2-removebg-preview.png';
import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact/', {
        name: name,
        email: email,
        query: message
      });
      if (response.status === 200) {
        alert('Your Query Message saved successfully.');

      } else {
        alert('Error while saving');
      }

      console.log('Form submitted successfully');
      // You can reset form fields here if needed
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };


  return (
    <>
      <hr />
      <div className="container" id="Contact" style={{ height: '100vh' }}>

        <div className="row " style={{ marginTop: '8rem' }}>
          <div className="col-md-6 d-flex align-items-center" style={{ borderRadius: '10rem' }}>

            <p>
              <h1 className="mb-4">Generative AI on NLPHub</h1>
              From startups to enterprises, organizations trust NLPHub to innovate with
              generative artificial intelligence (AI). With enterprise-grade security and privacy,
              access to industry-leading foundation models, and generative AI-powered applications,
              NLPHub makes it easy to build and scale generative AI, customized for your data, your use cases and your customers.
            </p>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <div className="card " style={{ width: '38rem', height: '30rem' }} >
                <div className='header col-md-12' style={{ height: '6rem', backgroundColor: '#232f3e', textAlign: 'center', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
                  <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem', backgroundColor: '#232f3e' }} />
                </div>
                <div className="card-body">

                  <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows="4"
                        placeholder="Enter your message"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                      Submit
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
