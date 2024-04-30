import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (
    <footer className="footer mt-auto py-3" style={{ backgroundColor: '#232f3e', color: '#ffffff', bottom: 0, width: '100%' }}>
      <div className="container">
        <div className="row">
          {/* Terms and Conditions Column */}
          <div className="col-lg-4 text-light">
            <h5>Terms and Conditions</h5>
            <p>@Copyright</p>
            {/* Add any other dummy data here */}
          </div>

          {/* Tools Column */}
          <div className="col-lg-4 text-light" >
            <h5>Tools</h5>
            <ul className="list-unstyled text-light" >
              <li>Sentiment Analysis</li>
              <li>Summary Generator</li>
              <li>Translator</li>
              {/* Add any other tools here */}
            </ul>
          </div>

          {/* Help Column */}
          <div className="col-lg-4 text-light">
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li>Contact Us</li>
              <li>Click on Email</li>
              {isLoggedIn ? (
                <li >

                  <button className="btn btn-secondary" style={{ backgroundColor: 'white', color: '#000000', borderRadius: '20px', width: 'calc(50% - 10px)', height: '3rem' }}>Connect with Us</button>

                </li>
              ) : (
                <>

                  <li >
                    <Link to="/account">
                      <button className="btn btn-outline-success my-2 my-sm-0" style={{ backgroundColor: '#FF914D', color: '#000000', borderRadius: '20px' }}>Create an Account</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
