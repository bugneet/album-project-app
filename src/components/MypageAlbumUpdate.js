import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MypageAlbumUpdate = () => {
    const { photoid } = useParams();

    const [photo, setPhoto] = useState({

        phototag: '',
        photodate: '',
    });

    const url = 'http://127.0.0.1:8000/media/'


    const loadData = async () => {
        // const response = await axios.get('http://localhost:8000/bokk_app/book/' + bookno);
        const response = await axios.get(`http://localhost:8000/albumupdate/${photoid}`);
        console.log("detail : ", response.data);
        setPhoto({
            ...response.data,

        });
    }

    useEffect(() => {
        loadData();
    }, []);

    const history = useNavigate();

    const onChange = (e) => {
        const { value, name } = e.target; // e.target에서 name과 value 추출
        setPhoto({
            ...photo, // 기존의 prd 객체 복제한 후
            [name]: value // name 키를 가진 값을 value로 설정
        });
    };

    // 취소 버튼 눌렀을 때
    const onReset = () => {
        window.history.back();
    };
    // submit 버튼 클릭 시
    const onSubmit = (e) => {
        e.preventDefault();

        var frmData = new FormData(document.frmUpdate);
        console.log(frmData)
        axios.put(`http://localhost:8000/album_update/${photoid}/`, frmData)
            .then(
                response => {
                    alert("수정 완료");
                    window.history.back();
                }

            )
    };

    return (
        <div>
            <h3>사진 정보 수정</h3>
            <form name="frmUpdate" onSubmit={onSubmit} onReset={onReset}>
                <img src={url + photo.image} /> <br />
                태그 :
                <input
                    type="text"
                    name="phototag"
                    value={photo.phototag}
                    onChange={onChange} /> <br />
                날짜 :
                <input
                    type="text"
                    name="photodate"
                    value={photo.photodate}
                    onChange={onChange} /> <br />

                <input type="submit" value="수정" />
                <input type="reset" value="취소" />
            </form>
        </div>

    );

};

export default MypageAlbumUpdate;