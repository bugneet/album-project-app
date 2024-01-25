import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PhotoList from './photoList'

const Board_writing = () => {
    let history = useNavigate();
    let { selectedPhoto } = useParams();

    const location = useLocation();

    console.log(location.state.selectedPhoto.image);
    console.log(location.state.selectedPhoto.photoid);

    const [board, setBoard] = useState({
        title: '',
        contents: '',
        selectedImage: null,
    });

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/current_user/')
            .then(response => setUser(response.data))
            .catch(error => console.error('에러', error));

    }, []);

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

        console.log(location.state.selectedPhoto.photoid)
        const formData = new FormData();
        formData.append('photoid', location.state.selectedPhoto.photoid);
        formData.append('title', board.title);
        formData.append('contents', board.contents);
        formData.append('created_time', new Date().toISOString());
        formData.append('id', user.id);

        if (board.selectedImage) {
            // console.log(board.selectedImage)
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
        history('/photoList'); // 'photoList' 페이지로 이동
    };


    return (
        <div>
            <h3>게시글 작성</h3>
            <form name="frmInsert" onSubmit={onSubmit} onReset={onReset}>
                <table id="board_insert">
                    <thead>
                        <tr>                        
                            <td>
                                <button type="button" onClick={handlePhotoSelect}>사진 선택</button>
                            </td>
                        </tr>
                        <tr>
                            <th>사진</th>
                            <td>
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
                            <th>내용</th>
                            <td> <input 
                                type="text"
                                name="contents"
                                value={board.contents}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input
                                    type="text"
                                    name="userId"
                                    value='1'
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit">제출</button>
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
};

export default Board_writing;