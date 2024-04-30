import React from 'react';
import './Home.css'; // Import CSS file for styling
import logo2 from './logo2-removebg-preview.png';
import back from './back.png'
const Home = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 " style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-left">
            {/* Added custom class for title */}
            <h1 className="title" style={{ color: 'white' }}>NLPHub for Your Personal Workpace</h1>
            <p className="lead">Welcome to NLP Hub, your premier destination for cutting-edge natural
              language processing tools. From translation to sentiment analysis, we offer a suite
              of powerful features to analyze, understand, and interact with text data effortlessly.</p>
            <div className="mt-4 d-flex justify-content-between">
              <button className="btn btn-primary" style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px', width: 'calc(50% - 10px)', height: '3rem' }}>Get Started</button>
              <button className="btn btn-secondary" style={{ backgroundColor: 'white', color: '#000000', borderRadius: '20px', width: 'calc(50% - 10px)', height: '3rem' }}>Connect with Us</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
