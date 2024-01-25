import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import MypageAlbum from './MypageAlbum';
import MypageAlbum2 from './MypageAlbum2';
import MypageMypost from './MypageMypost';
import MypageMyReply from './MypageMyReply';
import MypageMyLiked from './MypageMyLiked';

const Top = () => {
    return (
        <div id='top'>
            <ul>
                <li>
                    <Link to="/">[홈]</Link>
                    <Link to="/classification">[분류페이지]</Link>
                    <Link to="/">[전체분석]</Link>
                    <Link to="/">[전시관]</Link>
                    <Link to="/mypageAlbum2">[마이페이지]</Link>
                    <Link to="/">[로그인]</Link>
                    <Link to="/">[회원가입]</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/mypageAlbum2' element={<MypageAlbum2 />}></Route>
                <Route path='/mypageMypost' element={<MypageMypost />}></Route>
                <Route path='/mypageMyReply' element={<MypageMyReply />}></Route>
                <Route path='/mypageMyLiked' element={<MypageMyLiked />}></Route>

            </Routes>
        </div>
    );
};

export default Top;