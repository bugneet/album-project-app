import React, { useState } from "react";
import "../App.css";

const Main = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files).slice(0, 5);
    setSelectedFiles([...newFiles]);
    analyzeFiles([...newFiles]);
    setShowInstructions(false);
  };

  const analyzeFiles = (files) => {
    // 모델의 분석 레이어를 호출
    const mockResults = Array.from({ length: files.length }, (_, index) => `분석 결과 ${index + 1}`);
    setAnalysisResults(mockResults);
  };

  const getImageSizeClass = (count) => {
    return count < 5 ? "large" : "small";
  };

  return (
    <main className="container">
      <section className="section">
        <h1 className="main-title">📸 사진 업로드</h1>
        <label htmlFor="fileInput" className="file-label">
          <span className="file-button">이미지 선택</span>
        </label>
        <input
          type="file"
          id="fileInput"
          className="file-input"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        {selectedFiles.length > 0 && (
          <div>
            <p className="subtitle">
              선택한 파일: {selectedFiles.map((file) => file.name).join(", ")}
            </p>
            <div className={`selected-images ${getImageSizeClass(selectedFiles.length)}`}>
              {selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index + 1}`}
                  className="selected-image"
                />
              ))}
            </div>
          </div>
        )}
      </section>
      {!showInstructions && (
        <section className="section">
          <h2 className="main-title">전체 분석 결과</h2>
          <div className="analysis">
            {analysisResults.map((result, index) => (
              <p key={index}>{result}</p>
            ))}
          </div>
        </section>
      )}
      {showInstructions && (
        <section className="section">
          <h2 className="main-title">이용 방법</h2>
          <ol className="list">
            <li>사진을 업로드합니다.</li>
            <li>분류 버튼을 누르면 태그별로 앨범을 자동으로 분류합니다.</li>
            <li>편집 기능을 통해 사진을 더 아름답게 만듭니다.</li>
          </ol>
        </section>
      )}
    </main>
  );
};

export default Main;
