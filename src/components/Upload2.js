import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

const Upload2 = () => {
    let history = useNavigate();
    const [files, setFiles] = useState([]);

    const handleDrop = acceptedFiles => {
        setFiles([...files, ...acceptedFiles]);
    };

    const handleRemove = index => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
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

    return (
        <div>
            {/* 사진 업로드 부분 시작 */}
            <div style={{ position: 'relative' }}>
                <h2>Upload Photos</h2>
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{ border: '1px dashed black', padding: '20px' }}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some photos here, or click to select photos</p>
                        </div>
                    )}
                </Dropzone>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {files.map((file, index) => (
                        <div key={index} style={{ marginTop: '10px', marginRight: '10px', position: 'relative' }}>
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ maxWidth: '200px' }} />
                            <button onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'transparent', border: 'none', color: 'red', cursor: 'pointer', fontSize: '24px' }}>X</button>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit}>Upload</button>
            </div>
            {/* 사진 업로드 부분 끝  */}
        </div>
    );
};

export default Upload2;