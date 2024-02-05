import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Total_chart from './Total_chart';
import SignIn from './SignIn';
import Join from './Join';
import '../Top.css';
import Upload from './Upload';
import MypageAlbum2 from './MypageAlbum2';
import MypageMypost from './MypageMypost';
import MypageMyReply from './MypageMyReply';
import MypageMyLiked from './MypageMyLiked';
import Exhibition from './exhibition';
import BoardUpdate from './boardUpdate';
import Board_writing from './board_writing';
import PhotoList from './photoList';
import PhotoUpdate from './photoUpdate';
import Recommend from './recommend';
import Classification from './Classification';
import Personal_chart from './Personal_chart';
import Yearly_chart from './Yearly_chart';
import Personal_chart_yearly from './Personal_chart_yearly';
import Tag_count_yearly_chart from './Tag_count_yearly_chart';
import Custom_tags_count_yearly_chart from './custom_tags_count_yearly_chart';

import Upload2 from './Upload2';
import MypageRecentAlbum from './MypageRecentAlbum';
import MypageAlbumUpdate from './MypageAlbumUpdate';

import UserAnalysis2 from './UserAnalysis2';

const Top = () => {
    const username = localStorage.getItem("username");
    
    const onLogout = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/');
    };

    return (
        <div id='top' className='top-container'>
            <div className='logo-container'>
                        <Link to="/">
                            <img src="/logo.png" alt="로고" />
                        </Link>
                    </div>
            <ul className='nav-links'>
                <li>
                    <Link to="/total_chart">[전체분석차트]</Link>
                    <Link to="/exhibition">[전시관]</Link>
                    <Link to="/recommend">[추천]</Link>

                    {localStorage.getItem("token") === null ? (
                        <>
                            <Link to="/SignIn">[로그인]</Link>
                            <Link to="/Join">[회원가입]</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/UserAnalysis2">[분석페이지]</Link>
                            <Link to="/mypageAlbum2">[마이페이지]</Link>
                            <Link onClick={onLogout}>[로그아웃]</Link>
                        </>
                    )}
                </li>
            </ul>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/total_chart' element={<Total_chart />} />
                <Route path='/personal_chart/:username' element={<Personal_chart />} />
                <Route path='/personal_chart_yearly/:username' element={<Personal_chart_yearly />} />
                <Route path='/SignIn' element={<SignIn />}></Route>
                <Route path='/Join' element={<Join />}></Route>
                <Route path='/upload2' element={<Upload2 />}></Route>
                <Route path='/mypageAlbum2' element={<MypageAlbum2 />}></Route>
                <Route path='/mypageMypost' element={<MypageMypost />}></Route>
                <Route path='/mypageMyReply' element={<MypageMyReply />}></Route>
                <Route path='/mypageMyLiked' element={<MypageMyLiked />}></Route>
                <Route path='/exhibition' element={<Exhibition />} />
                <Route path='/boardUpdate/:board_no' element={<BoardUpdate />} />
                <Route path='/board_writing' element={<Board_writing />} />
                <Route path='/photoList' element={<PhotoList />} />
                <Route path='/photoUpdate/:board_no' element={<PhotoUpdate />} />
                <Route path='/recommend' element={<Recommend />} />
                <Route path='/classification' element={<Classification />} />
                <Route path='/mypageRecentAlbum' element={<MypageRecentAlbum />}></Route>
                <Route path='/albumUpdate/:photoid' element={<MypageAlbumUpdate />}></Route>

                <Route path='/yearly_chart' element={<Yearly_chart />} />
                <Route path='/tag_count_yearly_chart' element={<Tag_count_yearly_chart />} />
                <Route path='/custom_tags_count_yearly_chart' element={<Custom_tags_count_yearly_chart />} />

                <Route path='/UserAnalysis2' element={<UserAnalysis2 />} />
            </Routes >
        </div >
    );
};

export default Top;
