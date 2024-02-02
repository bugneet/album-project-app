import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Exhibition = () => {
  const [boards, setBoards] = useState([]);
  const [allPhototags, setAllPhototags] = useState([]);
  const [selectedPhototags, setSelectedPhototags] = useState([]);
  const [likes_and_replies, setLikesReplies] = useState([]);
  const [commentOpen, setCommentOpen] = useState({});
  const [newComment, setNewComment] = useState('');
  const [menuOpen, setMenuOpen] = useState({});
  const login = localStorage.getItem('username') !== null;
  const [load, setLoad] = useState(0);
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentData = boards.slice(startIndex, endIndex);
  const heart_icon1 = process.env.PUBLIC_URL + '/heart_icon1.png';
  const heart_icon2 = process.env.PUBLIC_URL + '/heart_icon2.png';

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const history = useNavigate();

  const url = 'http://127.0.0.1:8000/media/'

  const addBoard = () => {
    if (!login) {
      alert('로그인 해주세요');
      history("/SignIn/")
    } else{
      history("/photoList/")
    }
  }

  const likeLoad = async () => {
    try {
      const likedBoardsResponse = await axios.get(`http://localhost:8000/exhibition/userlikes/${localStorage.getItem('username')}/`);
      const likedBoards = likedBoardsResponse.data.liked_boards;
      return likedBoards;
    } catch (error) {
      console.error('좋아요 정보 불러오기 에러', error);
      return [];
    }
  };
  
  const loadData = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8000/exhibition/?page=${page}`);

      setAllPhototags(response.data.all_phototags);
      setLikesReplies(response.data.likes_and_replies);

      if (load === 0) {
        await handleClassify();
      }
      setLoad(1);
    } catch (error) {
      console.error('데이터 불러오기 에러', error);
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
        selectedtags: selectedPhototags
      });

      const likedBoards = await likeLoad();
  
      const updatedBoards = response.data.boards.map((board) => ({
        ...board,
        isLiked: likedBoards.includes(board.board_no),
      }));
  
      setBoards(updatedBoards);



      setCurrentPage(1);
    } catch (error) {
      console.error('분류 에러', error)
    }
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async (board_no) => {
    try {
      const response = await axios.post(`http://localhost:8000/exhibition/like/${board_no}/`, {
        board_no: board_no, username: localStorage.getItem('username')
      });

      console.log(response.data)
      
      setBoards((prevBoards) => {
        const updatedBoards = prevBoards.map((board) => {
          if (board.board_no === board_no) {
            return {
              ...board,
              isLiked: !board.isLiked,
            };
          }
          return board;
        });
        return updatedBoards;
      });

      loadData(currentPage);
    } catch (error) {
      console.error('좋아요 에러', error);
    }
  };

  const toggleMenu = (board_no) => {
    setMenuOpen((prevMenuOpen) => {
      return {...prevMenuOpen, [board_no]: !prevMenuOpen[board_no] };
    });
  };

  const toggleComment = (board_no) => {
    setCommentOpen((prevCommentOpen) => {
      return {...prevCommentOpen, [board_no]: !prevCommentOpen[board_no] };
    });
  };

  const addComment = async (board_no) => {
    if (login){
      try {
        await axios.post(`http://localhost:8000/exhibition/add_comment/${board_no}/`, {
          board_no: board_no,
          username: localStorage.getItem('username'),
          comment: newComment,
        });

        loadData();
        setNewComment('');
        alert("댓글이 추가되었습니다.")
      } catch (error) {
        console.error('댓글 추가 에러', error);
      }
    } else {
      alert('로그인 해주세요');
      history("/SignIn/")
    }
  };
  
  const deleteComment = async (rno) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8000/exhibition/delete_comment/${rno}/`, {
          rno: rno,
        });

        loadData();
        alert("댓글이 삭제되었습니다.")
      } catch (error) {
        console.error('댓글 삭제 에러', error);
      }
    }
  };

  const handleEdit = (board_no) => {
    setMenuOpen(null);

    history(`/boardUpdate/${board_no}/`);
  }

  const handleDelete = (board_no) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete('http://localhost:8000/board_delete/' + board_no)
        .then(
          () => {
            window.location.reload();
          }
        ).catch(err => console.log(err));
    }
  };

  const PageButtons = ({ total, current, onChange }) => {
    const range = 2;
  
    const start = Math.max(1, current - range);
    const end = Math.min(total, current + range * 2 - 2);
  
    const pages = [...Array(end - start + 1).keys()].map((i) => start + i);
  
    return (
      <div>
        {pages.map((page) => (
          <button key={page} onClick={() => onChange(page)} disabled={current === page}>
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="exhibition-container">
      <h1 className="exhibition-title">전시관</h1>
      <button id="addBoardBtn" onClick={addBoard}>
        글쓰기
      </button>

      <ul className="photo-tags">
        {allPhototags.map(([tag, frequency], index) => (
          <li key={tag} className="photo-tag">
            <input
              type="checkbox"
              id={`tagCheckbox_${tag}`}
              checked={selectedPhototags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            <label htmlFor={`tagCheckbox_${tag}`}>{`${tag} (${frequency})`}</label>
          </li>
        ))}
      </ul>

      <button id="classifyBtn" onClick={handleClassify}>
        분류
      </button>

      {currentData.map((board) => (
        <div key={board.board_no} className='board'>
          <div className='board_contents'>
            <div className='board_header'>
              <p className='board_username'>{board.id.username}</p>
              <div className='board_menu'>
                {(board.id.username === localStorage.getItem('username')) && (
                  <button onClick={() => toggleMenu(board.board_no)} className='board_menu_toggle'>
                    ...
                  </button>
                )}
                {menuOpen[board.board_no] && (
                  <div className='menu_button'>
                    <button onClick={() => handleEdit(board.board_no)}>수정</button>
                    <button onClick={() => handleDelete(board.board_no)}>삭제</button>
                  </div>
                )}
              </div>
            </div>

            <img src={url + board.photoid.image} alt="Board Image" className='board_image' />
            <div className='like'>
              <button className='like_button' onClick={() => handleLike(board.board_no)}>
                <img
                  src={(board.isLiked ? heart_icon2 : heart_icon1)}
                  className='like'
                  alt="Like Icon"
                />
              </button>
              <p className='like_count'>  
                좋아요 {likes_and_replies.find(item => item.board_no === board.board_no)?.likes_count || 0}개
              </p>
            </div>
            <h2 className='board_title'>{board.title}</h2>
            <p className='board_content'>{board.contents}</p>
            <p className='board_phototag'>{board.board_photo_tag}</p>

            <button onClick={() => toggleComment(board.board_no)} className='reply_toggle'>
              댓글 {likes_and_replies.find(item => item.board_no === board.board_no)?.replies.length || 0}개 모두 보기
            </button>

            <div className={`replies ${commentOpen[board.board_no] ? 'show' : 'hide'}`}>
              {likes_and_replies.find(item => item.board_no === board.board_no)?.replies.map(reply => (
                <div key={reply.rno} className='reply'>
                  <p>{reply.id}: {reply.replytext} <span className='reply_regdate'>{reply.regdate.slice(0,10)}</span></p>
                  {(reply.id === localStorage.getItem('username')) && (
                    <button onClick={() => deleteComment(reply.rno)}>삭제</button>
                  )}
                </div>
              ))}
            </div>
            <input
              className='reply_input'
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button onClick={() => addComment(board.board_no)} className='reply_add'>댓글 추가</button>
            <p className='board_created_time'>{board.created_time.slice(0, 10)}</p>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button id="prevPageBtn" onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </button>
        <PageButtons
          total={Math.ceil(boards.length / itemsPerPage)}
          current={currentPage}
          onChange={handlePageChange}
        />
        <button id="nextPageBtn" onClick={handleNextPage} disabled={endIndex >= boards.length}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Exhibition;