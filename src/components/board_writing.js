import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Board_writing = () => {
    let history = useNavigate();

    const location = useLocation();

    const [board, setBoard] = useState({
        title: '',
        contents: '',
        tags:'',
        selectedImage: null,
    });

    useEffect(() => {
        if (location.state && location.state.selectedPhoto) {
            const selectedPhotoTags = location.state.selectedPhoto.phototag;
            setBoard({
                ...board,
                tags: selectedPhotoTags,
            });
            console.log(board.tags);
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
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photoid', location.state.selectedPhoto.photoid);
        formData.append('title', board.title);
        formData.append('contents', board.contents);
        formData.append('tags', board.tags);
        formData.append('created_time', new Date().toISOString());
        formData.append('username', localStorage.getItem("username"));

        if (board.selectedImage) {
            formData.append('selectedImage', JSON.stringify(board.selectedImage));
        }

        axios.post('http://localhost:8000/board_writing/', formData)
            .then(response => {
                alert("게시글이 작성되었습니다.");
                history('/exhibition');
            })
            .catch(error => console.error('에러', error));
    };

    const handlePhotoSelect = () => {
        history('/photoList/');
    };


    return (
        <div className='board_writing_container'>
            <h3>게시글 작성</h3>
            <form name="frmInsert" onSubmit={onSubmit} onReset={onReset}>
                <table id="board_insert">
                    <thead>
                        <tr>                        
                            <td colSpan="2">
                                <button id='photo_select' type="button" onClick={handlePhotoSelect}>사진 선택</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <img src={location.state.selectedPhoto.image} alt='사진을 확인할 수 없습니다.'/>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td> <input 
                                type="text"
                                name="title"
                                value={board.title}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>태그</th>
                            <td><input 
                                type="text"
                                name="tags"
                                value={board.tags}
                                onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td> <input 
                                type="text"
                                name="contents"
                                value={board.contents}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button className='board_writing_submit' type="submit">제출</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
};

export default Board_writing;