import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const BoardUpdate = () => {
    let history = useNavigate();
    const location = useLocation();
    const { board_no } = useParams();
    const [photoid, setPhotoid] = useState(null);
    const url = 'http://127.0.0.1:8000/media/';

    const [board, setBoard] = useState({
      title: '',
      contents: '',
      tags: '',
      selectedImage: null,
    });
  
    useEffect(() => {
      const loadBoardInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/board/${board_no}/`);
          const boardInfo = response.data;
  
          setBoard({
            title: boardInfo.title,
            contents: boardInfo.contents,
            tags: boardInfo.board_photo_tag,
            selectedImage: boardInfo.photoid.image,
          });
          if (!(location.state && location.state.boardInfo)) {
            setPhotoid(boardInfo.photoid.photoid);          
          }
          
        } catch (error) {
          console.error('게시글 정보 불러오기 에러:', error);
        }
      };
  
      loadBoardInfo();
    }, [board_no]);
  
    useEffect(() => {
      if (location.state && location.state.boardInfo) {
        setBoard({
          title: location.state.boardInfo.title,
          contents: location.state.boardInfo.contents,
          tags: location.state.boardInfo.tags,
          selectedImage: location.state.boardInfo.selectedImage,
        });
        
        setPhotoid(location.state?.selectedPhoto?.id?.photoid)

      }
    }, [location.state]);

    const onChange = (e) => {
      const { value, name } = e.target;
      setBoard({
        ...board,
        [name]: value,
      });
    };
  
    const onReset = () => {
      setBoard({
        title: '',
        contents: '',
        tags: '',
        selectedImage: null,
      });
      history('/exhibition');
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('board_no', board_no);
      formData.append('title', board.title);
      formData.append('contents', board.contents);
      formData.append('created_time', new Date().toISOString());
      formData.append('tags', board.tags);
      console.log('board', photoid)
      formData.append('photoid', photoid);
      formData.append('username', localStorage.getItem("username"));
  
      axios.post(`http://localhost:8000/board/${board_no}/`, formData)
        .then(response => {
          alert("게시글이 수정되었습니다.");
          history('/exhibition');
        })
        .catch(error => {
          console.error('게시글 수정 오류:', error);
        });
    };
  
    const handlePhotoSelect = () => {
      history(`/photoUpdate/${board_no}`, {
        state: {
          boardInfo: {
            title: board.title,
            contents: board.contents,
            tags: board.tags,
            selectedImage: board.selectedImage,
            board_no: board_no
          },
          selectedPhoto: location.state?.selectedPhoto,
        },
      });
    };
  
    return (
      <div className="board_update_container">
        <h3>게시글 수정</h3>
        <form name="frmUpdate" onSubmit={onSubmit} onReset={onReset}>
            <div className='photo_update_image_container'>
                <button type="button" onClick={handlePhotoSelect} className="photo_select_btn">사진 선택</button>
                <img
                    src={location.state?.selectedPhoto?.image || (url + board.selectedImage)}
                    alt="Board Image"
                    className="board_image"
                />
            </div>
            <table id="board_update">
                <thead>
                <tr>
                    <th>제목</th>
                    <td>
                    <input
                        type="text"
                        name="title"
                        value={board.title}
                        onChange={onChange}
                    />
                    </td>
                </tr>
                <tr>
                    <th>태그</th>
                    <td>
                    <input
                        type="text"
                        name="tags"
                        value={board.tags}
                        onChange={onChange}
                    />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                    <textarea
                        name="contents"
                        value={board.contents}
                        onChange={onChange}
                    />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                    <input type="submit" value="수정" className="board_update_submit" />
                    <input type="reset" value="취소" className="board_update_reset" />
                    </td>
                </tr>
            </thead>
          </table>
        </form>
      </div>
    );
  };
  
  export default BoardUpdate;