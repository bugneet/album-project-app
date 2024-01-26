import React, { useEffect, useState } from 'react';
import MypageSidemenu from './MypageSidemenu';
import axios from 'axios'
import MypagePostItem from './MypagePostItem';
import MypageLikedItem from './MypageLikedItem';


const MypageMyLiked = () => {

    const itemsPerPage = 10;

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
        const response = await axios.get('http://localhost:8000/myliked/', {
            params: {
                username: localStorage.getItem("username")
            }
        })

        // const response = await axios.get('http://localhost:8000/myliked/', );
        console.log(response.data);
        // 받아온 값으로 state 값 저장
        setData(response.data);
    };

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
                <div id="post_content">
                    {
                        currentData.map(function (liked, i) {
                            return <MypageLikedItem liked={liked} key={i} />
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

export default MypageMyLiked;