import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const BoardUpdate = () => {
    const { board_no } = useParams();

    const [user, setUser] = useState({});
    
    const [board, setBoard] = useState({
        // board_no: '',
        title: '',
        contents: '',
        id: '',
        created_time: '',
    })

    useEffect(() => {
        axios.get('http://localhost:8000/current_user/')
            .then(response => setUser(response.data))
            .catch(error => console.error('에러', error))
    }, []);

    const loadData = async () => {
        const response = await axios.get(`http:localhost:8000/board/${board_no}/`);
        console.log("detail :", response.data);
        setBoard({
            // board_no: board_no,
            title: response.data.title,
            contents: response.data.contents,
            created_time: new Date().toISOString(),
            id: response.data.id 
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    let history = useNavigate();

    const onChange = (e) => {
        const {value, name} = e.target;
        setBoard({
            ...board,
            [name]: value
        })
    }

    const onReset = () => {
        setBoard({
            board_no: board.board_no,
            title: '',
            contents: '',
            id: '',
            created_time: '',
        })
    };
    
    const onSubmit = (e) => {
        e.prevenDefault();

        var frmData = new FormData(document.frmUpdate);
        axios.put(`http://localhost:8000/board/${board_no}/`, frmData)
            .then(
                response => {
                    alert("수정 완료");
                    history('/exhibition')
                }
            )
    }
    return (
        <div>
            <h3>게시글 수정</h3>
            <form name="frmUpdate" onSubmit={onSubmit} onReset={onReset}>
            <table id="board_insert">
                    <thead>
                        <tr>
                            <th>게시글번호</th>
                            <td> <input 
                                type="text"
                                name="board_no"
                                value={board_no}
                                readOnly
                                />
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
                            <th>제목</th>
                            <td> <input 
                                type="text"
                                name="title"
                                value={board.title}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input
                                    type="text"
                                    name="userId"
                                    value={user.username}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="수정" />
                                <input type="reset" value="취소" />
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
};

export default BoardUpdate;