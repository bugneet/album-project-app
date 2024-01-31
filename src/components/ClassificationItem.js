import React, { useState } from 'react';

const ClassificationItem = ({ item, onDataChange }) => {
    const [editedPhototag, setEditedPhototag] = useState(item.phototag);
    const url = 'http://127.0.0.1:8000/media/' + item.image;

    // 입력란 변경 시 데이터 업데이트 및 변경된 데이터 전달
    const handlePhototagChange = (e) => {
        const newValue = e.target.value;
        setEditedPhototag(newValue);
        onDataChange(newValue); // 변경된 데이터를 부모 컴포넌트로 전달
    };

    return (
        <div>
            <img src={url} />
            <p>Photo Hash: {item.photohash}</p>
            <p>
                Photo Tag:
                <input type="text" value={editedPhototag} onChange={handlePhototagChange} />
            </p>
            <p>Photo Date: {item.photodate}</p>
            <p>Upload Date: {item.uploaddate}</p>
            <p>Item Image: {item.image}</p>
        </div>
    );
};

export default ClassificationItem;
