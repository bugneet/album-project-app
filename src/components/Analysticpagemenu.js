import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css' ; 
const Analysticpagemenu = () => {
    return (
        <ul>
            <li><Link to="/total_chart">전체분석</Link></li>
            <li><Link to="/yearly_chart" >연도별 분석</Link></li>
            <li><Link to="/tag_count_yearly_chart">태그별 분석</Link></li>
            <li><Link to="/custom_tags_count_yearly_chart">선호도분석</Link></li>
        </ul>
    );
};

export default Analysticpagemenu;