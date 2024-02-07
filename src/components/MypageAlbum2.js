import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import { ScrollableFeed, FeedItem } from 'react-scrollable-feed';

import MypageAlbumItem from './MypageAlbumItem';
import MypageSidemenu from './MypageSidemenu';

import Pagination from './Pagination';

const itemsPerPage = 9;

const MypageAlbum2 = () => {

    const [data, setData] = useState([]);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [tagCounts, setTagCounts] = useState({});

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const currentData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);


    // const filteredData = filterDataByTags(data, selectedTags);

    const handleReset = () => {
        // 선택된 모든 체크박스 해제
        const newSelectedTags = [];
        setSelectedTags(newSelectedTags);
    };

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(item => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };


    const handlePageChange = page => {
        setCurrentPage(page);
        // 페이지 변경에 따른 데이터 로딩 등의 작업 수행
        window.scrollTo({ top: 0, behavior: "auto" });
    };
    // 서버에 요청해서 데이터 받아와서
    // state 값 저장하는 함수
    const loadData = async () => {
        const response = await axios.get(`http://localhost:8000/mixin/mypage_album/${localStorage.getItem("username")}/`);
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
    }, []);

    useEffect(() => {
        const uniqueTags = Array.from(new Set(data.flatMap(photo => photo.phototag.split("#"))));
        setTags(uniqueTags.filter(tag => tag !== ""));
    }, [data]);

    useEffect(() => {
        const filterDataByTags = (data, selectedTags) => {
            return data.filter(photo => {
                return selectedTags.every(tag => photo.phototag.includes(tag));
            });
        };

        const newFilteredData = filterDataByTags(data, selectedTags);
        setFilteredData(newFilteredData);
        setCurrentPage(1); // 태그가 변경될 때마다 첫 페이지로 이동
    }, [data, selectedTags]);

    useEffect(() => {
        const counts = tags.reduce((acc, tag) => {
            acc[tag] = filteredData.filter(photo => photo.phototag.includes(tag)).length;
            return acc;
        }, {});
        setTagCounts(counts);
    }, [tags, filteredData]);

    useEffect(() => {
        const uniqueTags = Array.from(new Set(filteredData.flatMap(photo => photo.phototag.split('#').filter(tag => tag.trim() !== ''))));
        const counts = uniqueTags.reduce((acc, tag) => {
            acc[tag] = filteredData.filter(photo => photo.phototag.includes(tag)).length;
            return acc;
        }, {});
        const sortedTags = uniqueTags.sort((a, b) => counts[b] - counts[a]);
        // sortedTags = uniqueTags.sort((a, b) => a.localeCompare(b));
        setTags(sortedTags);
    }, [filteredData, filteredData]);

    return (

        <div id='mypage_album_body'>

            <div id="menu">
                <h2>마이페이지</h2>
                <MypageSidemenu></MypageSidemenu>
            </div>
            <div id="content">
                <div className="checkbox-container">
                    {tags
                        .sort((a, b) => {
                            // 체크된 항목이 먼저 나오도록 정렬
                            const aChecked = selectedTags.includes(a);
                            const bChecked = selectedTags.includes(b);
                            if (aChecked && !bChecked) return -1;
                            if (!aChecked && bChecked) return 1;

                            // tagCounts가 높은 순으로 정렬
                            const aCount = tagCounts[a] || 0;
                            const bCount = tagCounts[b] || 0;
                            if (aCount > bCount) return -1;
                            if (aCount < bCount) return 1;

                            // 가나다 순으로 정렬
                            if (a < b) return -1;
                            if (a > b) return 1;
                            return 0;
                        })
                        .map(tag => (
                            <label key={tag} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                />
                                <span className="checkbox-text">{tag}({tagCounts[tag] || 0})</span>
                            </label>
                        ))}
                    <button onClick={handleReset} className="reset-button">리셋</button>
                </div>
                <div id="img_content">
                    {
                        currentData.map(function (picture, i) {
                            return <MypageAlbumItem picture={picture} key={i} />
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

export default MypageAlbum2;