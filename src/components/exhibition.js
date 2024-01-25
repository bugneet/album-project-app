import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exhibition = () => {
  const [boards, setBoards] = useState([]);
  const [allPhototags, setAllPhototags] = useState([]);
  const [selectedPhototags, setSelectedPhototags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('')
  const url = 'http://127.0.0.1:8000/media/'

  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/exhibition/?page=${currentPage}`);
      console.log("Data received from the server:", response.data);

      setBoards(response.data.boards);
      setAllPhototags(response.data.all_phototags);
      setLastPage(response.data.last_pages)
      console.log('Selected tags sent to the server:', selectedPhototags);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const handleCheckboxChange = (tag) => {
    setSelectedPhototags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleClassify = async () => {
    try {
      const response = await axios.post('http://localhost:8000/exhibition/', {
        selectedtags : selectedPhototags
      });
      console.log(response);

      setBoards(response.data.boards);
      setLastPage(response.data.last_pages);

    } catch (error) {
      console.error('Error', error)
    }
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLike = async (boards) => {
    try {
      const response = await axios.post('http://localhost:8000/exhibition/like/${boardId}/');
    } catch (error) {
      console.error('좋아요 에러', error);
    }
  };

  return (
    <div>
      <h1>전시관</h1>
      <Link to={"/photoList/"}><button>글쓰기</button></Link>

      <ul>
        {allPhototags.map(([tag, frequency], index) => (
          <li key={`${tag}-${index + 1}`} className='photo_tag'>
            <input
              type="checkbox"
              id={tag}
              checked={selectedPhototags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            <label htmlFor={tag}>{`${tag} (${frequency})`}</label>
          </li>
        ))}
      </ul>

      <button onClick={handleClassify}>분류</button>

      {boards.map((board) => (
        <div key={board.id} className='board'>
          <img src={url+board.photoid_image} alt="Board Image" className='board_image' />
          <div className='board_content'>
            <h2 className='board_title'>{board.title}</h2>
            <p className='board_created_time'>{board.created_time}</p>
            <p className='board_phototag'>{board.photoid_phototag}</p>
            <p className='board_contents'>{board.contents}</p>
          </div>
        </div>
      ))}

      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>

        {[...Array(5).keys()].map((offset) => {
          const pageNumber = currentPage + offset - 2;

          if (pageNumber > 0 && pageNumber <= lastPage) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                {pageNumber === currentPage ? `${pageNumber}/${lastPage}` : pageNumber}
              </button>
            );
          }

          return null;
        })}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Exhibition;