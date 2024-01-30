import React, { useEffect, useState } from 'react';
import MypageSidemenu from './MypageSidemenu';
import axios from 'axios'
import MypagePostItem from './MypagePostItem';
import Pagination from './Pagination';


const MypageMypost = () => {

    const itemsPerPage = 10;

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
        const response = await axios.get(`http://localhost:8000/mypost/${localStorage.getItem("username")}/`);
        console.log(response.data);
        // 받아온 값으로 state 값 저장
        setData(response.data);
    };

    useEffect(() => {
        loadData();
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        const uniqueTags = Array.from(new Set(data.flatMap(photo => photo.board_photo_tag.split("#"))));
        setTags(uniqueTags.filter(tag => tag !== ""));
    }, [data]);

    useEffect(() => {
        const filterDataByTags = (data, selectedTags) => {
            return data.filter(photo => {
                return selectedTags.every(tag => photo.board_photo_tag.includes(tag));
            });
        };

        const newFilteredData = filterDataByTags(data, selectedTags);
        setFilteredData(newFilteredData);
        setCurrentPage(1); // 태그가 변경될 때마다 첫 페이지로 이동
    }, [data, selectedTags]);

    useEffect(() => {
        const counts = tags.reduce((acc, tag) => {
            acc[tag] = data.filter(photo => photo.board_photo_tag.includes(tag)).length;
            return acc;
        }, {});
        setTagCounts(counts);
    }, [tags, data]);

    useEffect(() => {
        const uniqueTags = Array.from(new Set(data.flatMap(photo => photo.board_photo_tag.split('#').filter(tag => tag.trim() !== ''))));
        const counts = uniqueTags.reduce((acc, tag) => {
            acc[tag] = data.filter(photo => photo.board_photo_tag.includes(tag)).length;
            return acc;
        }, {});
        const sortedTags = uniqueTags.sort((a, b) => counts[b] - counts[a]);
        setTags(sortedTags);
    }, [data, data]);

    return (

        <div id='mypage_album_body'>

            <div id="menu">
                <h2>마이페이지</h2>
                <MypageSidemenu></MypageSidemenu>
            </div>
            <div id="content">
                <div className="checkbox-container">
                    {tags.map(tag => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}({tagCounts[tag] || 0})
                        </label>
                    ))}
                </div>
                <div id="post_content">
                    {
                        currentData.map(function (post, i) {
                            return <MypagePostItem post={post} key={i} />
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

export default MypageMypost;