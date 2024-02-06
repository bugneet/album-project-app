import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

const MypageAlbumOrigin = () => {
    const { imgurl } = useParams();
    const url = 'http://127.0.0.1:8000/media/' + imgurl


    // 취소 버튼 눌렀을 때
    const onReset = () => {
        window.history.back();
    };

    return (
        <div>
            <h3>사진 원본 보기</h3>
            <form name="frmUpdate" onReset={onReset} className="image-container-origin-page" >
                <img src={url} /> <br />
                <input type="reset" value="돌아가기" />
            </form>
        </div>

    );

};

export default MypageAlbumOrigin;