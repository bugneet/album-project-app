import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";

import '../UploadPage.css'; 

const UploadPage = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;

    setThumbnails(
      Array.from(selectedFiles).filter(file => file.type.startsWith('image/')).map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    );
  };

  const removeThumbnail = (index) => {
    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.splice(index, 1);
    setThumbnails(updatedThumbnails);
  };

  const onSubmit = async () => {
    setIsUploading(true);

    const formData = new FormData(document.forms.frmUpload);
    thumbnails.forEach((file, index) => {
      formData.append(`imgFile${index}`, file);
    });

    try {
      const response = await axios.post(`http://localhost:8000/upload/`, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      alert("업로드 완료");
      console.log(response.data);
    } catch (error) {
      console.error('업로드 에러:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const onClassify = () => {
    // 분류 로직 추가
    alert("분류 완료");
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>이미지 업로드</h2>
        {thumbnails.length === 0 && (
          <label htmlFor="imgFile" className="file-label">
            이미지 선택
            <input type='file' name='imgFile' id='imgFile' onChange={onFileChange} className="file-input" multiple accept="image/*" />
          </label>
        )}
        {thumbnails.length > 0 && (
          <button onClick={() => document.getElementById('imgFile').click()} className="add-photo-button">
            사진 추가
          </button>
        )}
        <div className="thumbnail-container">
          {thumbnails.map((file, index) => (
            <div key={file.name} className="thumbnail-item">
              <img src={file.preview} alt={file.name} className="thumbnail" />
              <button className="delete-button" onClick={() => removeThumbnail(index)}>취소</button>
            </div>
          ))}
        </div>
        <div className="button-container">
          {thumbnails.length > 0 && (
            <>
              <button
                onClick={onSubmit}
                className={`submit-button ${isUploading ? 'disabled' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? '업로드 중...' : '업로드'}
              </button>
              <button onClick={onClassify} className="classify-button">분류</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;

