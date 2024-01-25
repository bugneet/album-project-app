import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const MypageLikedItem = ({ liked }) => {

    let history = useNavigate()

    // const location = useLocation();
    // const file_name = location.state.file_name;
    const url = 'http://127.0.0.1:8000/media/' + liked.board_no.photoid.image

    // 삭제 버튼 클릭 시
    const onDeleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete('http://localhost:8000/book_app/book/' + liked.board_no.photoid)
                .then(
                    () => {
                        history('/mypageAlbum');
                        window.location.reload();
                        // reload 하지 않으면
                        // DB에서는 삭제되지만 현재 화면은 안 바뀜
                    }
                ).catch(err => console.log(err));
        }

    };

    return (

        <div className="mypost_item">

            <div className="mypost_image_container">
                <img src={url} />
            </div>
            <div className="mypost_contents_container">
                제목: {liked.board_no.title}<br />
                날짜: {liked.board_no.created_time}<br />
                태그: {liked.board_no.board_photo_tag}<br />
                내용: {liked.board_no.contents}<br />
                작성자: {liked.board_no.id.username}<br />
                <br /><button onClick={onDeleteItem}>삭제</button>
            </div>

        </div>



    );
};

export default MypageLikedItem;