import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Join = () => {
    let history = useNavigate();

    // state   
    const [user, setUser] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        user_name: '',
        user_address: ''
    });

    const onChange = (e) => {
        const { value, name } = e.target; // e.target에서 name과 value 추출
        setUser({
            ...user, // 기존의 prd 객체 복제한 후
            [name]: value // name 키를 가진 값을 value로 설정
        });

    };

    // 취소 버튼 눌렀을 때
    const onReset = () => {
        setUser({
            username: '',
            password: '',
            password2: '',
            email: '',
            user_name: '',
            user_address: ''
        })
    };


    // submit 버튼 클릭 시
    const onSubmit = (e) => {
        e.preventDefault();

        var frmData = new FormData(document.frmJoin);
        try {
            axios.post('http://localhost:8000/users/register/', frmData)
                .then(
                    response => {
                        alert("회원가입 완료");
                        history('/SignIn'); // 로그인 화면으로 이동
                    },
                    error => {
                        alert(error.response.data['password']);
                    }
                )
        } catch (error) {
            console('에러:', error);
        }
    };

    return (
        <div>
            <h3>회원가입</h3>
            <form name="frmJoin" onSubmit={onSubmit} onReset={onReset}>
                <table id="join_insert">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <td> <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td> <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td> <input
                                type="password"
                                name="password2"
                                value={user.password2}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td> <input
                                type="text"
                                name="user_name"
                                value={user.user_name}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td> <input
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td> <input
                                type="text"
                                name="user_address"
                                value={user.user_address}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="가입" />
                                <input type="reset" value="취소" />
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
};

export default Join;