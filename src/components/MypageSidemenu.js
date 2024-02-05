import React from 'react';
import { Link } from 'react-router-dom';

const MypageSidemenu = () => {
    return (
        <ul>
            <li><Link to="/mypageRecentAlbum">최근사진</Link></li>
            <li><Link to="/mypageAlbum2">엘범보기</Link></li>
            <li><Link to="/personal_chart/{username}">분석결과</Link></li>
            <li><Link to="/personal_chart_yearly/{username}">분석결과연도별</Link></li>
            <li><Link to="/mypageMypost">내게시글</Link></li>
            <li><Link to="/mypageMyReply">내댓글</Link></li>
            <li><Link to="/mypageMyLiked">좋아요(사진)</Link></li>
            <li><Link to="/recommend">상품 추천</Link></li>
        </ul>
    );
};

export default MypageSidemenu;