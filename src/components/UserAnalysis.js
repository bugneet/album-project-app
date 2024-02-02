import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAnalysis = ({ username }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user_analysis/${username}/`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user analysis data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{username} 님의 분석 페이지</h1>
          <p>전체 이미지 수: {userData.total_images_count} 개입니다.</p>
          <UserTopTags topTags={userData.user_tags} />
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

const UserTopTags = ({ topTags }) => {
  return (
    <div>
      <h2>상위 태그 TOP3</h2>
      <ul>
        {topTags.map((tag, index) => (
          <li key={index}>{tag.phototag} ( {tag.tag_count} )</li>
        ))}
      </ul>
    </div>
  );
};

export default UserAnalysis;
