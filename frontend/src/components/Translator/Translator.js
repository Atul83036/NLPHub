import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import logo2 from './logo2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
const Translator = ({ isLoggedIn }) => {

  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfSummary, pdfSetSummary] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language
  const navigate = useNavigate();
  // Then, you can update the language using setSelectedLanguage wherever needed.





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
  const handleLanguageChange = async (newLanguage) => {
    setSelectedLanguage(newLanguage);
    try {
      const response = await axios.post('http://localhost:8000/api/translate_pdf/', {
        text: pdfSummary,
        target_language: newLanguage, // Send the selected language to the backend
      });
      pdfSetSummary(response.data.translated_text);
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

  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const newhandleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const newhandleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/textTranslator/', { text, target_language: selectedLanguage });
      setTranslatedText(response.data.translated_text);

    } catch (error) {
      console.error('Error translating text:', error);
    }

    setIsLoading(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  const [textToShow, setTextToShow] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < translatedText.length) {
        setTextToShow((prevText) => prevText + translatedText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [translatedText]);


  return (
    <div className="container-fluid d-flex vh-100 background-gradient">
      <p style={{ background: 'white', position: 'fixed', top: '5.5rem', left: '0', width: '100%', zIndex: 1000 }}>
        <span onClick={handleTextSummaryClick} style={{ cursor: 'pointer' }}>Text Translator</span>
        <span style={{ margin: '0 0.5rem' }}>➔</span>
        <span onClick={handlePdfClick} style={{ cursor: 'pointer' }}>Pdf Translator</span>
      </p>
      <div className="container" style={{ marginTop: '1rem' }}>
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

                      <select className="form-select " value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="bengali">Bengali</option>
                        <option value="marathi">Marathi</option>
                        <option value="tamil">Tamil</option>
                        <option value="telugu">Telugu</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="gujarati">Gujarati</option>
                        <option value="kannada">Kannada</option>
                        <option value="malayalam">Malayalam</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="italian">Italian</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                        <option value="korean">Korean</option>
                      </select>

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

                <h2 className="text-center mt-0 " style={{ backgroundColor: 'black', color: 'white' }}>
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
                          accept=".pdf"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="fileInput">
                          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                            <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                          </svg>
                          <p>
                            <span className="btn btn-upload" style={{ backgroundColor: 'black', color: 'white' }}>Upload file</span><br />
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
          <div className="card" style={{ marginTop: '5rem', height: '28rem' }}>
            <div className="card-body">
              <h2 className="text-center mt-0 " style={{ backgroundColor: 'black', color: 'white', borderRadius: '4px' }}>
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
                    <div className="mb-3 ">
                      <button type="submit" className="btn  " disabled={isLoading} style={{ backgroundColor: 'black', color: 'white' }}>
                        {isLoading ? 'Translating...' : 'Translate'}
                      </button>
                    </div>
                  </div>
                  {/* Right side: Output text */}
                  <div className="col-md-6" style={{ backgroundColor: '#d8d8ff' }}>
                    <div className="mb-3" >
                      <select className="form-select" value={selectedLanguage} onChange={newhandleLanguageChange}>
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="bengali">Bengali</option>
                        <option value="marathi">Marathi</option>
                        <option value="tamil">Tamil</option>
                        <option value="telugu">Telugu</option>
                        <option value="punjabi">Punjabi</option>
                        <option value="gujarati">Gujarati</option>
                        <option value="kannada">Kannada</option>
                        <option value="malayalam">Malayalam</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="italian">Italian</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                        <option value="korean">Korean</option>
                      </select>
                    </div>
                    {translatedText && (
                      <div className="mt-2" style={{ overflow: 'scroll', height: '15rem' }}>
                        <h5>Translated Text:</h5>
                        <p>{translatedText}</p>
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

export default Translator;
