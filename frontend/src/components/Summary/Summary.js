import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import logo2 from './logo2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
const Summary = ({ isLoggedIn }) => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false); // State to manage whether to show PDF version or text summary
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfSummary, pdfSetSummary] = useState('');

  const [textToShow, setTextToShow] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setTextToShow(''); // Reset textToShow to start the animation from the beginning
    const interval = setInterval(() => {
      if (currentIndex < summary.length) {
        setTextToShow((prevText) => prevText + summary[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [summary]);


  const handleLanguageChange = async (newLanguage) => {

    try {
      const response = await axios.post('http://localhost:8000/api/summary_generator/', {
        input_text: pdfSummary,
      });
      pdfSetSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    const fileName = file.name;
    formData.append('pdf_file', file);
    formData.append('title', fileName);

    try {
      const response = await axios.post('http://localhost:8000/api/upload_pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setUploadedFile(file);

      // Set summary with extracted data from the backend
      pdfSetSummary(response.data.extracted_text || 'Unable to extract text from the PDF');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
  };


  const handleDownload = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/download_pdf/', {
        translated_text: pdfSummary,
      }, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'translated_document.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };












  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/summary/', { text });
      setSummary(response.data.summary_text);
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

  return (
    <div className="container-fluid d-flex  vh-100 " style={{ backgroundColor: '#ec36f43b' }}>
      <p style={{ background: 'white', position: 'fixed', top: '5.5rem', left: '0', width: '100%', zIndex: 1000 }}>
        <span onClick={handleTextSummaryClick} style={{ cursor: 'pointer' }}>Text Summary</span>
        <span style={{ margin: '0 0.5rem' }}>➔</span>
        <span onClick={handlePdfClick} style={{ cursor: 'pointer' }}>Pdf Summarizer</span>
      </p>
      <div className="container " style={{ marginTop: '2rem' }}>

        {showPdf ? (
          <>
            {uploadedFile ? (
              <div className="container-fluid" style={{ background: '#ebebeb', height: '35rem', alignContent: 'center', alignItems: 'center' }}>
                <div className='' style={{ display: 'flex' }}>
                  <div className="col-md-6">
                    <iframe
                      src={`${URL.createObjectURL(uploadedFile)}#zoom=auto`}
                      type="application/pdf"
                      width="100%"
                      height="530"
                      className="embed-responsive-item"
                      style={{ border: 'none' }}
                      allowFullScreen
                      zoom="50%"
                    ></iframe>
                  </div>

                  <div className="card" style={{ backgroundColor: '#d8d8ff' }}>
                    <div className='container-fluid ' style={{ marginTop: '0', }}>

                      <button className="btn btn-primary" onClick={handleLanguageChange}>Summarize</button>

                      <button className="btn btn-danger col-md-3" onClick={handleDownload}>
                        <i className="uil uil-file-alt"></i>Download
                      </button>
                    </div>
                    <div className="card-body" style={{ height: '30rem', overflow: 'scroll' }}>
                      <p className="card-text">{pdfSummary}</p>

                    </div>
                  </div>
                </div>
              </div>

            ) : (
              <div className="container-fluid" style={{ background: '#ebebeb', height: '30rem', alignContent: 'center', alignItems: 'center' }}>
                {/* PDF Translator content */}

                <div style={{ marginTop: '2rem' }}>
                  <h2 className="text-center mt-0 " style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '4px' }}>
                    <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem' }} />
                    NLPHub | Your Personal Workspace
                  </h2>
                </div>
                {/* below Create File uploader form should be in center look like card  */}
                <div className="text-center" style={{ marginLeft: '10rem', marginTop: '3rem' }}>

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
                      <div style={{ marginTop: '5rem' }}>
                        <input
                          type="file"
                          id="fileInput"
                          accept=".pdf"
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

          </>
        ) : (
          <div className="card" style={{ marginTop: '3rem', height: '28rem' }}>
            <div className="card-body">
              <h2 className="text-center mt-0 " style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '4px' }}>
                <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem', }} />
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
                      <button type="submit" className="btn" disabled={isLoading} style={{ backgroundColor: 'blueviolet', color: 'white', borderRadius: '4px' }}>
                        {isLoading ? 'Summarizing...' : 'Summarize'}
                      </button>
                    </div>
                  </div>
                  {/* Right side: Output text */}
                  <div className="col-md-6" style={{ backgroundColor: '#d8d8ff' }}>
                    {summary && (
                      <div className="mt-2" style={{ overflow: 'scroll', height: '19rem' }}>
                        <h5>Summary:</h5>
                        <p>{summary}</p>
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

export default Summary;
