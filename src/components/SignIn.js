import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    // state   
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const onChange = (e) => {
        const { value, name } = e.target; // e.target에서 name과 value 추출
        setUser({
            ...user, // 기존의 user 객체 복제한 후
            [name]: value // name 키를 가진 값을 value로 설정
        });

    };

    // submit 버튼 클릭 시
    const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/users/login/', {
            username: user.username,
            password: user.password,
        })
            .then(
                response => {
                    localStorage.setItem("token", response.data["token"]);
                    localStorage.setItem("username", user.username);
                    console.log(localStorage.getItem("token"));
                    window.location.replace('http://localhost:3000/') // 홈 화면으로 이동
                },
                error => {
                    alert(error.response.data['error']);
                    // {"error": "아이디 또는 비밀번호가 잘못되었습니다"}) 출력됨

                    // 입력란 지우고
                    setUser({
                        username: '',
                        password: '',
                        id: ''
                    });

                    // ID 입력란에 포커스 주기
                    document.getElementById('username').focus()
                }
            )
    };

    // 취소 버튼 눌렀을 때
    const onReset = () => {
        setUser({
            username: '',
            password: ''
        })
    };

    return (
        <div>
            <h3>로그인</h3>
            <form name="frmLogin" onSubmit={onSubmit} onReset={onReset}>
                <table id="login">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <td> <input
                                type="text"
                                id="username"
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
                            <td colSpan="2">
                                <input type="submit" value="로그인" />
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
};

export default SignIn;