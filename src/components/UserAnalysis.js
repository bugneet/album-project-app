import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAnalysis = ({ username }) => {
  const [user_data, setUser_data] = useState(null);

  useEffect(() => {
    const fetchUser_data = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user_analysis/${username}/`);
        setUser_data(response.data);
      } catch (error) {
        console.error('Error fetching user analysis data:', error);
      }
    };

    fetchUser_data();
  }, [username]);

  return (
    <div>
      {user_data ? (
        <div>
          <h1>{username} 님의 분석 페이지</h1>
          <p>전체 이미지 수: {user_data.total_images_count} 개입니다.</p>
          <UserTopTags topTags={user_data.user_tags} />
          <MatchingSection userTags={user_data.user_tags} matchingActivities={user_data.matching_activities} />
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

const MatchingSection = ({ userTags, matchingActivities }) => {
  return (
    <div>
      <h2>{username} 님의 선호 하는 엑티비티는 </h2>
      {matchingActivities ? (
        <ul>
          {matchingActivities.map((activity, index) => (
            <li key={index}>{activity.name}</li>
          ))}
        </ul>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
      {renderAssociatedActivities(userTags, matchingActivities)}
    </div>
  );
};

const renderAssociatedActivities = (userTags, matchingActivities) => {
  if (userTags.length >= 3 && matchingActivities) {
    const topTags = userTags.slice(0, 3).map(tag => tag.phototag);
    
    return (
      <div>
        <h2>선호 할수도 있는 액티비티:</h2>
        {topTags.map(tag => (
          <div key={tag}>
            <strong>{tag} 와 연관된 액티비티들:</strong>
            <ul>
              {matchingActivities
                ?.filter(activity => activity.tags.includes(tag))
                .map((activity, index) => (
                  <li key={index}>{activity.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default UserAnalysis;
