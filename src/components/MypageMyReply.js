import React, { useEffect, useState } from 'react';
import MypageSidemenu from './MypageSidemenu';
import axios from 'axios'
import MypageReplyItem from './MypageReplyItem';
import Pagination from './Pagination';


const MypageMyReply = () => {

    const itemsPerPage = 10;

    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = page => {
        setCurrentPage(page);
        // 페이지 변경에 따른 데이터 로딩 등의 작업 수행
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    // 서버에 요청해서 데이터 받아와서
    // state 값 저장하는 함수
    const loadData = async () => {
        const response = await axios.get(`http://localhost:8000/myreply/${localStorage.getItem("username")}/`);
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

                </div>
                <div id="post_content">
                    {
                        currentData.map(function (reply, i) {
                            return <MypageReplyItem reply={reply} key={i} />
                        })
                    }
                </div>
                <div className="pagenumber_container">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

        </div>
    );
};

export default MypageMyReply;