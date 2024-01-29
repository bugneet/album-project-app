import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import { ScrollableFeed, FeedItem } from 'react-scrollable-feed';

import MypageAlbumItem from './MypageAlbumItem';
import MypageSidemenu from './MypageSidemenu';

const itemsPerPage = 9;

const MypageAlbum2 = () => {


    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const currentData = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

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
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [currentPage]);
    return (

        <div id='mypage_album_body'>

            <div id="menu">
                <h2>마이페이지</h2>
                <MypageSidemenu></MypageSidemenu>
            </div>
            <div id="content">
                <div className="checkbox-container">
                    체크박스 or 검색 들어갈곳
                </div>
                <div id="img_content">
                    {
                        currentData.map(function (picture, i) {
                            return <MypageAlbumItem picture={picture} key={i} />
                        })
                    }
                </div>
                <div>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        이전 페이지
                    </button>
                    <span>현재 페이지: {currentPage}</span>
                    <button onClick={handleNextPage} disabled={endIndex >= data.length}>
                        다음 페이지
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MypageAlbum2;