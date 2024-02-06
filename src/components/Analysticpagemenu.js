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

const Analysticpagemenu = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // 수직 정렬
        justifyContent: 'center', // 중앙 정렬
    };

    return (
        <div style={containerStyle}>
            <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', width: '200px', padding: 0, lineHeight: '3.5' }}>
                <li style={{paddingRight: '15px'}}><Link to="/total_chart" style={buttonStyles}>전체분석</Link></li>
                <li ><Link to="/yearly_chart" style={buttonStyles}>연도별 분석</Link></li>
                <li ><Link to="/tag_count_yearly_chart" style={buttonStyles}>태그별 분석</Link></li>
                <li><Link to="/custom_tags_count_yearly_chart" style={buttonStyles}>선호도 분석</Link></li>
            </ul>
        </div>
    );
};

export default Analysticpagemenu;
