import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Join from './Join';
import '../App.css'; 
import Upload from './Upload';

const Top = () => {
    const onLogout = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/')
    };

    return (
        <div id='top' className='top-container'>
            <ul className='nav-links'>
                <li>
                    <Link to="/">[홈]</Link>
                    <Link to="/classification">[분류페이지]</Link>
                    <Link to="/upload">[분석]</Link>
                    <Link to="/">[전시관]</Link>
                    <Link to="/mypage_album">[마이페이지]</Link>
                    {
                        localStorage.getItem("token") === null ?
                            <Link to="/SignIn">[로그인]</Link> :
                            <Link onClick={onLogout}>[로그아웃]</Link>
                    }
                    <Link to="/Join">[회원가입]</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/SignIn' element={<SignIn />}></Route>
                <Route path='/Join' element={<Join />}></Route>
                <Route path='/upload' element={<Upload />}></Route>
            </Routes>
        </div>
    );
};

export default Top;
