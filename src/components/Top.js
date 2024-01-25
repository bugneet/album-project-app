import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Exhibition from './exhibition';
import BoardUpdate from './boardUpdate';
import Board_writing from './board_writing';
import PhotoList from './photoList';

const Top = () => {
    return (
        <div id='top'>
            <ul>
                <li>
                    <Link to="/">[홈]</Link>
                    <Link to="/classification">[분류페이지]</Link>
                    <Link to="/">[전체분석]</Link>
                    <Link to="/exhibition">[전시관]</Link>
                    <Link to="/mypage_album">[마이페이지]</Link>
                    <Link to="/">[로그인]</Link>
                    <Link to="/">[회원가입]</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/exhibition' element={<Exhibition />} />
                <Route path='/boardUpdate/:board_no' element={<BoardUpdate />} />
                <Route path='/board_writing' element={<Board_writing />} />
                <Route path='/photoList' element={<PhotoList />} />
            </Routes>
        </div>
    );
};

export default Top;