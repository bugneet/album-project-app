import React, { useEffect, useState } from 'react';
import axios from 'axios'

import MypageAlbumItem from './MypageAlbumItem';

const MypageAlbum = () => {

    const [data, setData] = useState([]);

    // 서버에 요청해서 데이터 받아와서
    // state 값 저장하는 함수
    const loadData = async () => {
        const response = await axios.get('http://localhost:8000/mixin/mypage_album/');
        console.log(response.data);
        // 받아온 값으로 state 값 저장
        setData(response.data);
    };

    // useEffect() : 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 해주는 Hook
    // 렌더링 될 때마다 호출 
    // loadData() 한 번만 호출하도록 설정 : 빈 배열 지정
    useEffect(() => {
        loadData();
    }, []);

    return (

        <div id='mypage_album_body'>
            <div id="menu">
                <h2>마이페이지</h2>
                <ul>
                    <li><a href="{% url 'mypage_album' %}">앨범보기</a></li>
                    <li><a href="#">분석결과</a></li>
                    <li><a href="{% url 'mypage_mypost' %}">내게시글</a></li>
                    <li><a href="{% url 'mypage_myreply' %}">내댓글</a></li>
                    <li><a href="#">좋아요(사진)</a></li>

                </ul>
            </div>

            <div id="content">
                <div className="checkbox-container">
                    체크박스 들어갈곳
                </div>
                <div id="img_content">
                    {
                        data.map(function (picture, i) {
                            return <MypageAlbumItem picture={picture} key={i} />
                        })
                    }
                </div>
                <div >
                    1/2/3/4/5/6 페이지
                </div>
            </div>
        </div>
    );
};

export default MypageAlbum;