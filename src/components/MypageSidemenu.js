import React from 'react';
import { Link } from 'react-router-dom';

const buttonStyles = {
    backgroundColor: '#4285F4',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const MypageSidemenu = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // 수직 정렬
        textAlign: 'left',   // 텍스트 정렬
    };

    return (
        <div style={containerStyle}>
            <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', width: '200px', paddingLeft: 100, lineHeight: '3.0', marginRight: '10px' }}>
                <li><Link to="/mypageRecentAlbum" style={buttonStyles}>최근사진</Link></li>
                <li><Link to="/mypageAlbum2" style={buttonStyles}>엘범보기</Link></li>
                <li><Link to="/personal_chart/{username}" style={buttonStyles}>분석결과</Link></li>
                <li><Link to="/personal_chart_yearly/{username}" style={buttonStyles}>분석결과연도별</Link></li>
                <li><Link to="/mypageMypost" style={buttonStyles}>내게시글</Link></li>
                <li><Link to="/mypageMyReply" style={buttonStyles}>내댓글</Link></li>
                <li><Link to="/mypageMyLiked" style={buttonStyles}>좋아요(사진)</Link></li>
                <li><Link to="/recommend" style={buttonStyles}>상품 추천</Link></li>
                <li><Link to="/UserAnalysis2" style={buttonStyles}>성향 분석</Link></li>
            </ul>
        </div>
    );
};

export default MypageSidemenu;
