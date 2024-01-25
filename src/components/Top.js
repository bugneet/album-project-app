import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Total_chart from './Total_chart';
import Test_chart from './Test_chart';

const Top = () => {
    return (
        <div id='top'>
            <ul>
                <li>
                    <Link to="/">[홈]</Link>
                    <Link to="/classification">[분류페이지]</Link>
                    <Link to="/">[전체분석]</Link>
                    <Link to="/">[전시관]</Link>
                    <Link to="/mypage_album">[마이페이지]</Link>
                    <Link to="/total_chart">[전체분석페이지]</Link>
                    <Link to="/test_chart">[분석페이지]</Link>
                    <Link to="/">[로그인]</Link>
                    <Link to="/">[회원가입]</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/total_chart' element={<Total_chart />} />
                <Route path='/test_chart' element={<Test_chart />} />
            </Routes>
        </div>
    );
};

export default Top;