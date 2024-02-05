import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserAnalysis2.css';
const UserAnalysis2 = () => {
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagCounts, setTagCounts] = useState({});
    const username = localStorage.getItem("username");

    const activities = {
        '운동': [
            {'name': '자전거 타기', 'tags': ['자전거', '벤치', '공원']},
            {'name': '야구', 'tags': ['야구배트', '야구글러브', '야구공']},
            { 'name': '스키', 'tags': ['스키', '스노우보드', '겨울'] },
            { 'name': '공놀이', 'tags': ['공', '야구배트', '야구장'] },
            { 'name': '롤러블레이딩', 'tags': ['스케이트보드', '롤러블레이드', '공원'] },
            { 'name': '수영', 'tags': ['물병', '수영복', '수영장'] },
            { 'name': '요가', 'tags': ['요가 매트', '스트레칭', '명상'] },
            { 'name': '필라테스', 'tags': ['필라테스 매트', '덤벨', '스트레칭'] },
            { 'name': '헬스', 'tags': ['덤벨', '바벨', '운동복'] },
        ],
        '레저': [
            { 'name': '피크닉', 'tags': ['바구니', '샌드위치', '공원'] },
            { 'name': '등산', 'tags': ['등산화', '등산 배낭', '산'] },
            { 'name': '낚시', 'tags': ['낚싯대', '낚시 미끼', '강'] },
            { 'name': '캠핑', 'tags': ['텐트', '취사 도구', '캠핑장'] },
            { 'name': '게임', 'tags': ['컴퓨터', '게임 패드', '게임'] },
            { 'name': '영화 감상', 'tags': ['팝콘', '콜라', '영화관'] },
            { 'name': '음악 감상', 'tags': ['헤드폰', '음악 스트리밍 서비스', '공연장'] },
            { 'name': '독서', 'tags': ['책', '커피', '도서관'] },
        ],
        '기타': [
            { 'name': '여행', 'tags': ['여권', '비행기표', '숙소'] },
            { 'name': '학습', 'tags': ['책', '노트', '강의실'] },
            { 'name': '취미', 'tags': ['악기', '도구', '동호회'] },
            { 'name': '일', 'tags': ['컴퓨터', '휴대폰', '사무실'] },
        ],
        '추가 액티비티': [
            { 'name': '자전거 여행', 'tags': ['자전거', '텐트', '캠핑장'] },
            { 'name': '야구 경기 관람', 'tags': ['야구장', '야구팬', '응원'] },
            { 'name': '스키 여행', 'tags': ['스키', '숙소', '스키장'] },
            { 'name': '공놀이 대회', 'tags': ['공', '야구배트', '야구장'] },
            { 'name': '롤러블레이딩 대회', 'tags': ['롤러블레이드', '공원'] },
            { 'name': '수영 대회', 'tags': ['물병', '수영복', '수영장'] },
            { 'name': '요가 수업', 'tags': ['요가 매트', '스트레칭', '명상'] },
            { 'name': '필라테스 수업', 'tags': ['필라테스 매트', '덤벨', '스트레칭'] },
            { 'name': '헬스장 이용', 'tags': ['덤벨', '바벨', '운동복'] },
            { 'name': '피크닉 데이트', 'tags': ['바구니', '샌드위치', '공원'] },
            { 'name': '등산 여행', 'tags': ['등산화', '등산 배낭', '산'] },
            { 'name': '낚시 여행', 'tags': ['낚싯대', '낚시 미끼', '강'] },
            { 'name': '캠핑 여행', 'tags': ['텐트', '취사 도구', '캠핑장'] },
            { 'name': '게임 대회', 'tags': ['컴퓨터', '게임 패드', '게임'] },
            { 'name': '영화 관람', 'tags': ['팝콘', '콜라', '영화관'] },
            { 'name': '음악 감상', 'tags': ['헤드폰', '음악 스트리밍 서비스', '공연장'] },
            { 'name': '독서', 'tags': ['책', '커피', '도서관'] },
            { 'name': '여행 준비', 'tags': ['여권', '비행기표', '숙소'] },
            { 'name': '학습 준비', 'tags': ['책', '노트', '강의실'] },
            { 'name': '취미 활동', 'tags': ['악기', '도구', '동호회'] },
            { 'name': '일상 생활', 'tags': ['컴퓨터', '휴대폰', '사무실'] },
            { 'name': '자동차 여행', 'tags': ['사람', '아이들', '자동차'] },
        ],
    };

    const loadData = async () => {
        const response = await axios.get(`http://localhost:8000/mixin/mypage_album/${username}/`);
        setData(response.data);
    };

    useEffect(() => {
        loadData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        const uniqueTags = Array.from(new Set(data.flatMap(photo => photo.phototag.split("#"))));
        setTags(uniqueTags.filter(tag => tag !== ""));
    }, [data]);

    useEffect(() => {
        const counts = tags.reduce((acc, tag) => {
            acc[tag] = data.filter(photo => photo.phototag.includes(tag)).length;
            return acc;
        }, {});
        setTagCounts(counts);
    }, [tags, data]);

    const totalImageCount = Object.values(tagCounts).reduce((acc, count) => acc + count, 0);
    const sortedTags = tags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
    const topTags = sortedTags.slice(0, 3);

    // 상위 태그와 일치하는 액티비티 추출
    const matchingActivities = Object.keys(activities).flatMap(category =>
        activities[category].filter(activity =>
            activity.tags.some(tag => topTags.includes(tag))
        )
    );

    // 태그를 가진 액티비티 추출
    const similarActivities = Object.keys(activities).flatMap(category =>
        activities[category].filter(activity =>
            activity.tags.some(tag => tags.includes(tag))
        )
    );

    
    return (
        <div className="container">
            <h1 className="header">{username} 님의 분석 페이지</h1>
            <p>전체 이미지 갯수: {totalImageCount} 입니다</p>

            <h2 className="activityheader">상위 태그 TOP3</h2>
            <div className="tagContainer">
                {topTags.map((tag, index) => (
                    <span key={tag} className="tag">
                        {tag}
                    </span>
                ))}
            </div>

            <h2 className="activityheader">추천 액티비티</h2>
            <div className="activityContainer">
                {matchingActivities.map(activity => (
                    <div key={activity.name} className="activityCard">
                        <p>{activity.name}</p>
                    </div>
                ))}
            </div>

            <h2 className="activityheader">당신이 관심을 가질 만한 액티비티</h2>
            <div className="activityGroup">
                {topTags.map((tag, index) => (
                    <div key={tag} className="activityCard">
                        <h3 className="tagHeading">{tag} 태그에 관련된 액티비티</h3>
                        {matchingActivities
                            .filter(activity => activity.tags.includes(tag))
                            .map(activity => (
                                <div key={activity.name}>
                                    <h4>{activity.name}</h4>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAnalysis2;
