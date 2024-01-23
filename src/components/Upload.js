import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const history = useNavigate();
  const [thumbnails, setThumbnails] = useState([]);

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;

    setThumbnails(
      Array.from(selectedFiles).map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(document.frmUpload);
    thumbnails.forEach((file, index) => {
      formData.append(`imgFile${index}`, file);
    });

    try {
        const response = await axios.post(`http://localhost:8000/Upload/`, formData, {
          headers: { 'content-type': 'multipart/form-data' },
        });
      
        alert("업로드 완료");
        console.log(response.data);
      
        // 포워딩 하면서 파라미터 전달 
        history('/uploadResult', {
          state: { file_name: response.data },
        }); // 업로드 결과 화면으로 이동
      } catch (error) {
        console.error('업로드 에러:', error);
    }
      

  return (
    <div>
      <h2>다중 파일 업로드</h2>
      <form name="frmUpload" method='post' onSubmit={onSubmit}>
        <label htmlFor="imgFile">이미지 선택:</label>
        <input type='file' name='imgFile' id='imgFile' onChange={onFileChange} multiple />
        {thumbnails.map((file) => (
          <div key={file.name}>
            <img src={file.preview} alt={file.name} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
          </div>
        ))}
        <input type='submit' value='완료' />
      </form><br /><br />
    </div>
  );
};
}
export default Upload;
