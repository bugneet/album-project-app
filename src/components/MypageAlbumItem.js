import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const MypageAlbumItem = ({ picture }) => {

    const formattedDate = new Date(picture.photodate).toLocaleString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간 형식
    });

    let history = useNavigate()

    // const location = useLocation();
    // const file_name = location.state.file_name;
    const url = 'http://127.0.0.1:8000/media/' + picture.image

    // 삭제 버튼 클릭 시
    const onDeleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete('http://localhost:8000/myalbumdel/' + picture.photoid)
                .then(
                    () => {
                        // history('/mypageAlbum');
                        window.location.reload();
                        // reload 하지 않으면
                        // DB에서는 삭제되지만 현재 화면은 안 바뀜
                    }
                ).catch(err => console.log(err));
        }

    };

    return (

        <div className="image-container">
            <Link to={"/albumOrigin/" + picture.image}><img src={url} /></Link>
            <div>
                날짜: {formattedDate}<br />
                태그: {picture.phototag}<br />
                <Link to={"/albumOrigin/" + picture.image}><button>원본보기</button></Link>
                <Link to={"/albumUpdate/" + picture.photoid}><button>수정</button></Link>
                <button onClick={onDeleteItem}>삭제</button>
            </div>
        </div>

    );
};

export default MypageAlbumItem;