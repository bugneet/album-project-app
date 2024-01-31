import React, { useState } from 'react';
import axios from 'axios';

const Recommend = () => {
    const [rec, setRec] = useState('');

    const recommend = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/recommend_contents/`);
            
            console.log(response.data);
            alert('버튼');
        } catch (error) {
            console.error('좋아요 정보 불러오기 에러', error);
            return [];
        }
      };
    return (
        <div>
            <h1>컨텐츠 추천</h1>
            <button onClick={recommend}>추천</button>
            
        </div>
    );
};

export default Recommend;