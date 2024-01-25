import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const MypagePostItem = ({ post }) => {

    let history = useNavigate()

    // const location = useLocation();
    // const file_name = location.state.file_name;
    const url = 'http://127.0.0.1:8000/media/' + post.photoid.image

    // 삭제 버튼 클릭 시
    const onDeleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete('http://localhost:8000/book_app/book/' + post.photoid)
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
                제목: {post.title}<br />
                날짜: {post.created_time}<br />
                태그: {post.board_photo_tag}<br />
                내용: {post.contents}<br />
                이미지: {post.photoid.image}<br />
                <br /><button>수정</button>
                <button onClick={onDeleteItem}>삭제</button>
            </div>

        </div>



    );
};

export default MypagePostItem;