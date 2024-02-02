import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommend = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [userTagsInfo, setUserTagsInfo] = useState([]);
    const [recommendTags, setRecommendTags] = useState([]);

    const [userContents, setUserContents] = useState([]);
    const [recommendContents, setRecommendContents] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/recommend_tags/${localStorage.getItem('username')}`);

            const currentUserData = response.data.current_user;
            const current_user = {
                id: currentUserData[0],
                name: currentUserData[1],
                tags: currentUserData[2].join(', '),
            };
            const reversedTags = [...currentUserData[2]].reverse().join(', ');
            current_user.tags = reversedTags;

            setCurrentUser(current_user);

            const currentUserTags = response.data.current_user[2];

            const users = response.data.similar_user.user_id.map((userId, index) => ({
                id: userId,
                name: response.data.similar_user.username[index],
                tags: response.data.similar_user.tags[index],
                tagCount: response.data.similar_user.tag_count[index],
            }));

            const userTagsInfo = users.map(user => {
                const overlappingTags = Object.keys(user.tagCount)
                    .filter(tag => currentUserTags.includes(tag))
                    .sort((a, b) => user.tagCount[b] - user.tagCount[a]);

                const nonOverlappingTags = Object.keys(user.tagCount)
                    .filter(tag => !currentUserTags.includes(tag))
                    .sort((a, b) => user.tagCount[b] - user.tagCount[a]);

                return {
                    id: user.id,
                    name: user.name,
                    overlappingTags,
                    nonOverlappingTags,
                };
            });

            setUserTagsInfo(userTagsInfo);

            const allNonOverlappingTagsSet = new Set(userTagsInfo.flatMap(user => user.nonOverlappingTags));
            const allNonOverlappingTags = [...allNonOverlappingTagsSet];
            setRecommendTags(allNonOverlappingTags);

        } catch (error) {
            console.error('추천 태그 에러', error);
        }
    };

    const recommend =  async () => {
        try {
            const user_tags = currentUser.tags;
            const response = await axios.get(`http://localhost:8000/recommend_contents/`, {
                params: { 
                    'recommend_tags': recommendTags.join(','),
                    'user_tags': user_tags,}
            });

            const { user_content, recommend_content } = response.data;

            setUserContents(user_content);
            setRecommendContents(recommend_content);
            
        }catch (error) {
            console.log('컨텐츠 추천 에러', error)
        }
    }

    return (
        <div>
            <p>{currentUser.name}님과 비슷한 취향을 가진 사람들입니다.</p>
            <p>이런 제품은 어떠신가요? <button onClick={recommend}>보기</button></p>
            <div>
                <h2>User Contents</h2>
                {userContents.map((content) => (
                    <div key={content.contents_id}>
                        <p>Contents Name: {content.contents_name}</p>
                        <p>Content Link: {content.contents_link}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>Recommend Contents</h2>
                {recommendContents.map((content) => (
                    <div key={content.contents_id}>
                        <p>Contents Name: {content.contents_name}</p>
                        <p>Content Link: {content.contents_link}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommend;
