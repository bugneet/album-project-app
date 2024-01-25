import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const MypageReplyItem = ({ reply }) => {

    let history = useNavigate()

    // const location = useLocation();
    // const file_name = location.state.file_name;
    // const url = 'http://127.0.0.1:8000/media/' + post.photoid.image

    const formattedDate = new Date(reply.regdate).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24시간 형식
    });

    // 삭제 버튼 클릭 시
    const onDeleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete('http://localhost:8000/myreplydel/' + reply.rno)
                .then(
                    () => {
                        history('/mypageMyReply');
                        window.location.reload();
                        // reload 하지 않으면
                        // DB에서는 삭제되지만 현재 화면은 안 바뀜
                    }
                ).catch(err => console.log(err));
        }

    };


    return (

        <div className="mypost_item">

            <div className="mypost_contents_container">
                글제목: {reply.board_no.title}<br />
                ㄴ댓글: {reply.replytext} <br /><br />
                날짜: {formattedDate}<br />
                <button onClick={onDeleteItem}>삭제</button>
            </div>

        </div>



    );
};

export default MypageReplyItem;