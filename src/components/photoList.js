import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const PhotoList = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

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
        navigate('/board_writing', {state: {selectedPhoto: photo}});
    }

    return (
        <div className="photo_list_container">
            <h3>사진 목록</h3>
            <ul className='photo_list'>
                {photos.map(photo => (
                    <li key={photo.photoid} onClick={() => handleImageSelect(photo)} className='photo_list_item'>
                        <img src={photo.image} alt="이미지 불러오기 실패" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhotoList;