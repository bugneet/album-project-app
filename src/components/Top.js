import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Join from './Join';
import '../App.css';
import Upload from './Upload';
import MypageAlbum2 from './MypageAlbum2';
import MypageMypost from './MypageMypost';
import MypageMyReply from './MypageMyReply';
import MypageMyLiked from './MypageMyLiked';
import Exhibition from './exhibition';
import BoardUpdate from './boardUpdate';
import Board_writing from './board_writing';
import PhotoList from './photoList';

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
                    <Link to="/exhibition">[전시관]</Link>
                    <Link to="/mypageAlbum2">[마이페이지]</Link>
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
                <Route path='/mypageAlbum2' element={<MypageAlbum2 />}></Route>
                <Route path='/mypageMypost' element={<MypageMypost />}></Route>
                <Route path='/mypageMyReply' element={<MypageMyReply />}></Route>
                <Route path='/mypageMyLiked' element={<MypageMyLiked />}></Route>
                <Route path='/exhibition' element={<Exhibition />} />
                <Route path='/boardUpdate/:board_no' element={<BoardUpdate />} />
                <Route path='/board_writing' element={<Board_writing />} />
                <Route path='/photoList' element={<PhotoList />} />
            </Routes>
        </div>
    );
};

export default Top;
