import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo2 from './logo2-removebg-preview.png';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend, Line, LineChart } from 'recharts';

const Sentiment = ({ isLoggedIn }) => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false); // State to manage whether to show PDF version or text summary
  const navigate = useNavigate();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    const fileName = file.name;
    formData.append('csv_file', file);
    formData.append('title', fileName);

    try {
      const response = await axios.post('http://localhost:8000/api/upload_csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedFile(file);
      setSentimentData(response.data.customers);
    } catch (error) {
      console.error(error);
    }
  };
  const data = [
    { name: 'Positive', value: sentimentData[0]?.count || 0 },
    { name: 'Negative', value: sentimentData[1]?.count || 0 },
    { name: 'Neutral', value: sentimentData[2]?.count || 0 },
  ];

  const COLORS = ['#0088FE', '#FF0000', '#FFBB28'];

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
  };














  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/textSentiment/', { text });
      setSummary(response.data.sentiment_output);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
    setIsLoading(false);
  };

  const handlePdfClick = () => {
    if (isLoggedIn) {
      setShowPdf(true);
    } else {
      // Redirect to sign-in page if not logged in
      navigate('/SignIn');
    }
  };

  const handleTextSummaryClick = () => {
    setShowPdf(false);
  };


  const renderEmoji = (sentimentOutput) => {
    if (sentimentOutput.includes('Positive')) {
      return <span role="img" aria-label="positive" style={{ fontSize: '3rem' }}>😊</span>;
    } else if (sentimentOutput.includes('Negative')) {
      return <span role="img" aria-label="negative" style={{ fontSize: '3rem' }}>😔</span>;
    } else {
      return <span role="img" aria-label="neutral" style={{ fontSize: '3rem' }}>😐</span>;
    }
  };

  return (
    <div className="container-fluid d-flex  vh-100 background-gradient">
      <p style={{ background: 'white', position: 'fixed', top: '5.5rem', left: '0', width: '100%', zIndex: 1000 }}>
        <span onClick={handleTextSummaryClick} style={{ cursor: 'pointer' }}>Sentiment Analysis</span>
        <span style={{ margin: '0 0.5rem' }}>➔</span>
        <span onClick={handlePdfClick} style={{ cursor: 'pointer' }}>Pro Version</span>
      </p>
      <div className="container " style={{ marginTop: '2rem' }}>

        {showPdf ? (
          <>
            <div className="outer-container">
              <div className="inner-container">

                {uploadedFile ? (
                  <div className="container-fluid" style={{ background: 'white', height: '35rem', width: '70rem', alignContent: 'center', alignItems: 'center', overflow: 'scroll' }}>



                    <h1 className='text-center' style={{ fontSize: '1rem' }}>Sentiment Analysis Dashboard</h1>
                    <div className='card col-md-14 ' style={{ backgroundColor: '#ebebeb' }}>
                      {/*<ResponsiveContainer width="100%" height={400}>
              <BarChart data={sentimentData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="black" />
              </BarChart>
            </ResponsiveContainer>
            <div className="review-counts">
              <p>Positive Reviews: {sentimentData[0].count}</p>
              <p>Negative Reviews: {sentimentData[1].count}</p>
              <p>Neutral Reviews: {sentimentData[2].count}</p>
      </div>*/}

                      <div className=' row '>
                        <div className='card col-md-5 mb-4 mx-5' >
                          <p className='text-center'>No. Of riviews by customers :</p>
                          <div className='row mx-4 mb-4 ' style={{ justifyContent: 'space-around' }}>
                            <div className='card col-md-4 mb-4 mx-2 text-center' style={{ backgroundColor: '#0000ff7a', color: 'white', padding: '1rem' }}>Total :{sentimentData[0].count + sentimentData[1].count + sentimentData[2].count} 📊</div>
                            <div className='card col-md-4 mb-4 mx-2 text-center' style={{ backgroundColor: '#0000ff7a', color: 'white', padding: '1rem' }}>Positive :{sentimentData[0].count}😊</div>
                            <div className='card col-md-4 mb-4 mx-2 text-center' style={{ backgroundColor: '#0000ff7a', color: 'white', padding: '1rem' }}>Negative :{sentimentData[1].count}😞</div>
                            <div className='card col-md-4 mb-4 mx-2 text-center' style={{ backgroundColor: '#0000ff7a', color: 'white', padding: '1rem' }}>Neutral: {sentimentData[2].count}😐</div>
                          </div>
                        </div>
                        <div className='card col-md-5 mb-4 mx-4' style={{}} >
                          <ResponsiveContainer width="100%" height={230}>
                            <PieChart>
                              <Pie
                                data={data}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                fill="#8884d8"
                                label
                              >
                                {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>

                              <Legend align="right" verticalAlign="middle" layout="vertical" />

                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className='card col-md-5  mb-4 mx-5'>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={sentimentData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="customers" fill="red" />
                              <Bar dataKey="customers" fill="green" />
                              <Bar dataKey="customers" fill="yellow" />
                            </BarChart>
                          </ResponsiveContainer>

                        </div>
                        <div className='card col-md-5  mb-4 mx-4'>


                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={sentimentData}>
                              <CartesianGrid stroke="#ccc" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="customers" stroke="#8884d8" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>



                  </div>
                ) : (
                  <div className="container-fluid" style={{ background: '#ebebeb', height: '30rem', alignContent: 'center', alignItems: 'center' }}>
                    {/* PDF Translator content */}

                    <h2 className="text-center mt-0 " style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '4px' }}>
                      <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem' }} />
                      NLPHub | Your Personal Workspace
                    </h2>
                    {/* below Create File uploader form should be in center look like card  */}
                    <div className="text-center" style={{ marginLeft: '10rem' }}>
                      <div className='col-md-10'
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ background: 'white', textAlign: 'center', alignContent: 'center', height: '18rem', alignItems: 'center', borderRadius: '5px', border: '1px solid black' }}>
                        <div
                          className="col-md-10 Zone-container "
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          style={{ background: '#032af438', textAlign: 'center', alignContent: 'center', height: '15rem', marginLeft: '4rem', marginTop: '1.5rem', alignItems: 'center', borderRadius: '5px', border: '1px dashed #cccccc' }}
                        >
                          <div style={{ marginTop: '4rem' }}>
                            <input
                              type="file"
                              id="fileInput"
                              accept=".csv"
                              onChange={handleFileUpload}
                              style={{ display: "none" }}
                            />
                            <label htmlFor="fileInput">
                              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                              </svg>
                              <p>
                                <span className="btn btn-primary btn-upload" >Upload file</span><br />
                                <span>or Drop Pdf file.</span>
                              </p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>


          </>
        ) : (
          <div className="card" style={{ marginTop: '2rem', height: '28rem' }}>
            <div className="card-body">
              <h2 className="text-center mt-0 " style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '4px' }}>
                <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem' }} />
                NLPHub | Your Personal Workspace
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left side: Textarea */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <textarea
                        style={{ border: '1px solid black' }}
                        placeholder='Enter Your Full Text here .............'
                        id="textInput"
                        className="form-control"
                        rows="10"
                        value={text}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                      </button>
                    </div>
                  </div>
                  {/* Right side: Output text */}
                  <div className="col-md-6" style={{ justifyContent: 'center', backgroundColor: '#d8d8ff' }}>
                    {summary && (
                      <div className="text-center" style={{ height: '15rem', justifyContent: 'center' }}>

                        <h1 style={{ marginTop: '2rem' }}>{summary}</h1>
                        <h1>{renderEmoji(summary)}</h1>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sentiment;
