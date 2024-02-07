import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Dropzone from 'react-dropzone';
import axios from 'axios';

const Main = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [files, setFiles] = useState([]);
  const [isFilesSelected, setIsFilesSelected] = useState(false); // 파일이 선택되었는지 여부를 나타내는 상태

  const navigate = useNavigate();

  let history = useNavigate();

  const handleDrop = acceptedFiles => {
    setFiles([...files, ...acceptedFiles]);
    setIsFilesSelected(true); // 파일이 선택되었음을 나타내는 상태를 true로 업데이트
  };

  const handleRemove = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setIsFilesSelected(false); // 모든 파일이 제거되면 파일이 선택되지 않은 상태로 업데이트
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('imgFiles', file);
    });

    try {
      await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(
          response => {
            alert("업로드 완료");
            // console.log(response.data);
            // 포워딩 하면서 파라미터 전달 
            history('/classification', {
              state: { fileNames: response.data }
            }); // 업로드 결과 화면으로 이동
          }
        );
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos.');
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);
    analyzeFiles([...files]);
  };

  const analyzeFiles = (files) => {
    // 모델의 분석 레이어를 호출
    const mockResults = Array.from({ length: files.length }, (_, index) => `분석 결과 ${index + 1}`);
    setAnalysisResults(mockResults);
  };

  const getImageSizeClass = (count) => {
    return count < 5 ? "large" : "small";
  };

  const goToUploadPage = () => {
    // '/upload'로 이동
    navigate("/upload", { state: { selectedFiles, analysisResults } });
  };

  return (
    <main className="container">
      <section className="section">
        <div style={{ position: 'relative' }}>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px' }}>
                <input {...getInputProps()} />
                <h1 className="main-title">📸 사진 업로드</h1>
                <label htmlFor="fileInput" className="file-label">
                  <span className="file-button">이미지 선택</span>
                </label>
              </div>
            )}
          </Dropzone>
          {isFilesSelected && ( // 파일이 선택된 경우에만 버튼을 렌더링
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {files.map((file, index) => (
                  <div key={index} style={{ marginTop: '10px', marginRight: '10px', position: 'relative' }}>
                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '200px' }} />
                    <button onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', color: 'red', cursor: 'pointer', fontSize: '24px' }}>X</button>
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit}>파일 업로드</button>
            </div>
          )}
        </div>

      </section>

      {showInstructions ? (
        <section className="section">
          <h2 className="main-title">이용 방법</h2>
          <ol className="list">
            <li>사진을 업로드합니다.</li>
            <li>분류 버튼을 누르면 태그별로 앨범을 자동으로 분류합니다.</li>
            <li>분류된 사진을 토대로 여러 분석을 살펴보세요!</li>
          </ol>
        </section>
      ) : (
        <section className="section">
          <h2 className="main-title">전체 분석 결과</h2>
          <div className="analysis">
            {analysisResults.map((result, index) => (
              <p key={index}>{result}</p>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Main;
