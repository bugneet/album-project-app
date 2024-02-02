import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClassificationItem from './ClassificationItem';
import { useLocation, useNavigate } from 'react-router-dom';

const Classification = () => {
    const history = useNavigate()
    const location = useLocation();
    const fileNames = location.state.fileNames.fileNames;
    // const fileNames = ['file1.jpg', 'file2.jpg']; // 파일 이름 배열

    console.log("분류페이지");
    console.log(fileNames);

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:8000/classification/', {
            params: {
                fileNames: fileNames
            }
        });
        setData(response.data);
    };


    useEffect(() => {
        loadData();
    }, []);

    const handleSaveData = async () => {
        try {
            const modifiedData = data.map((item) => ({ ...item }));
            await axios.post(`http://localhost:8000/save-data/${localStorage.getItem("username")}`, modifiedData);
            alert('데이터가 성공적으로 저장되었습니다.');
            // 저장 요청이 완료된 후에 데이터 다시 로드
            // loadData();
            history('/mypageRecentAlbum');

        } catch (error) {
            console.error('데이터 저장 중 오류 발생:', error);
            alert('데이터 저장 중 오류가 발생했습니다.');
        }
    };

    const handlePhototagChange = (index, newValue) => {
        const newData = [...data];
        newData[index].phototag = newValue;
        setData(newData);
    };

    return (
        <div>
            {data.map((item, i) => (
                <ClassificationItem
                    key={i}
                    item={item}
                    onDataChange={(newValue) => handlePhototagChange(i, newValue)}
                />
            ))}
            <button onClick={handleSaveData}>저장</button>
        </div>
    );
};

export default Classification;
