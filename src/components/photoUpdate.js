import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

const PhotoUpdate = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://localhost:8000/photos/${localStorage.getItem('username')}`)
            .then(response => {
                const photosWithFullImagePath = response.data.photos.map(photo => ({
                ...photo,
                image: `http://localhost:8000/media/${photo.image}`
                }));
                setPhotos(photosWithFullImagePath);
                })
                .catch(error => console.error('에러', error));
      }, []);

    const handleImageSelect = (photo) => {
        const mergedState = {
            ...location.state,
            selectedPhoto: {
                title: photo.title,
                contents: photo.contents,
                tags: photo.tags,
                image: photo.image,
                id: photo,
            },
        };
    
        navigate(`/boardUpdate/${location.state.boardInfo.board_no}/`, { state: mergedState });
    };

    return (
        <div>
            <h3>사진 목록</h3>
            <ul>
                {photos.map(photo => (
                    <li key={photo.id} onClick={() => handleImageSelect(photo)}>
                        {photo.image} <br/>
                        <img src={photo.image} alt="이미지 불러오기 실패" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoUpdate;