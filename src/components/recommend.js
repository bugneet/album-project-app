import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MypageSidemenu from './MypageSidemenu';

const Recommend = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [userTags, setUserTags] = useState('');
    const [recommendTags, setRecommendTags] = useState([]);

    const [userContents, setUserContents] = useState([]);
    const [recommendContents, setRecommendContents] = useState([]);
    
    const url = 'http://127.0.0.1:8000/media/'

    useEffect(() => {
        loadData();
    }, []);
    
    useEffect(() => {
        recommend();
    }, [recommendTags]);

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
            
            const allOverlappingTagsSet = new Set(userTagsInfo.flatMap(user => user.overlappingTags))
            const allOverlappingTag = [...allOverlappingTagsSet];
            const allNonOverlappingTagsSet = new Set(userTagsInfo.flatMap(user => user.nonOverlappingTags));
            const allNonOverlappingTags = [...allNonOverlappingTagsSet];
            setUserTags(allOverlappingTag);
            setRecommendTags(allNonOverlappingTags);

            await recommend();
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
        <div id='mypage_album_body'>
            <div id="menu">
                <h2>마이페이지</h2>
                <MypageSidemenu></MypageSidemenu>
            </div>
            {recommendContents.length > 0 && (
                <div id='content_box'>
                    <p>{currentUser.name}님이 관심있어하는 태그입니다</p>
                    <div className='recommend_tags'>
                        <p>[</p>
                        {userTags.map((tag) => (
                            <div key={tag}>
                                <p>{tag}</p>
                            </div>
                        ))}
                        <p>]</p>
                    </div>
                    <p>{currentUser.name}님! 이런 제품은 어떠신가요?</p>
                    <div className='user_content'>
                        {userContents.map((content) => (
                            <div key={content.contents_id}>
                                <p className='content_name'>{content.contents_name}</p>
                                <a href={content.contents_link}>
                                    <img src={url + content.contents_image} className='content_image'/>
                                </a>
                            </div>
                        ))}
                    </div>
                    <p>{currentUser.name}님과 비슷한 취향을 가진 사람들이 관심있어 하는 태그입니다!</p>
                    <div className='recommend_tags'>
                        <p>[</p>
                        {recommendTags.map((tag) => (
                            <div key={tag}>
                                <p>{tag}</p>
                            </div>
                        ))}
                        <p>]</p>
                    </div>
                    <p>{currentUser.name}님과 비슷한 취향을 가진 사람들이 관심있어 하는 제품입니다!</p>
                    <div className='recommend_content'>
                        {recommendContents.map((content) => (
                            <div key={content.contents_id}>
                                <p className='content_name'>{content.contents_name}</p>
                                <a href={content.contents_link}>
                                    <img src={url + content.contents_image} className='content_image' />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {recommendContents.length === 0 && (
                <div id="loading_data">Loading...</div>
            )}
        </div>
    );
};

export default Recommend;
