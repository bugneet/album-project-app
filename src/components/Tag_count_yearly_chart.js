import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Label, ReferenceLine } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import { Button, Select } from 'antd';
import tagData from '../data/tag_count.json'
import contents from '../data/recommend.json'

const { Option } = Select;
const Tag_count_yearly_chart = () => {
    const [data, setData] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedTagInfo, setSelectedTagInfo] = useState({});



    const handleTagChange = (value) => {
        setSelectedTag(value);
        const tagInfo = contents.find(item => item.phototag.indexOf(value) !== -1);

        setSelectedTagInfo(tagInfo || {});
    };

    useEffect(() => {
        setData(tagData);
    }, []);



    const lis = ['자전거', '자동차', '오토바이', '비행기', '버스', '기차', '트럭', '보트',
        '벤치', '새', '고양이', '강아지', '양', '소', '코끼리', '곰', '얼룩말', '기린',
        '가방', '우산', '핸드백', '넥타이', '캐리어', '스키', '스노우보드', '공', '야구배트',
        '야구글러브', '스케이트보드', '테니스라켓', '물병', '와인잔', '컵', '포크',
        '나이프', '숟가락', '접시', '바나나', '사과', '샌드위치', '오렌지', '브로콜리',
        '당근', '핫도그', '피자', '도넛', '케이크', '소파', '화분', '침대', '식탁',
        '텔레비전', '컴퓨터', '마우스', '키보드', '전화기', '전자레인지', '오븐',
        '토스터기', '싱크대', '냉장고', '책', '꽃병', '곰인형',
        '장신구', '에어프라이어', '비행기날개', '백팩', '풍선', '아이들',
        '맥주잔', '카메라', '양초', '건배', '전시된옷', '화장품', '십자가',
        '에펠탑', '안경', '등대', '바베큐고기', '원판(덤벨 및 바벨)',
        '포장고기', '바지', '휴대폰뒷면', '턱걸이', '케이블카',
        '러닝머신', '신발', '소주잔', '선글라스', '일출(일몰)',
        '사원', '상의', '손목시계']

    return (
        <div id="charDB" style={{ display: 'flex', flexDirection: 'row', marginLeft: '-250px',marginRight :'40px' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginRight: '20px', backgroundColor: '#f2f2f2' ,textAlign: 'center'}}>
                <h2>분석페이지</h2>
                <ul>
                    <Analysticpagemenu></Analysticpagemenu>
                </ul>
                <Select
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder="Select a tag"
                    onChange={handleTagChange}
                    value={selectedTag}
                >
                    {lis.map((tag, index) => (
                        <Option key={index} value={tag}>
                            {tag}
                        </Option>
                    ))}
                </Select>

            </div>

            {/* 오른쪽에 그래프 영역 */}
            <div>

                <LineChart width={1500} height={600} data={data.find(item => item.tagname === selectedTag)?.tagcount_by_year || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tagcount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <ReferenceLine
                        y={0}
                        stroke="#666"
                        strokeDasharray="3 3"
                        label={<Label value={selectedTag} position="insideBottomRight" fontSize={25} fontWeight="bold" offset={20} />} // offset을 추가하여 그래프에서 멀리 위치하게 함
                    />
                </LineChart>

                {selectedTagInfo && selectedTagInfo.phototag && (
                    <div style={{ marginTop: '0px' }}>
                        <img
                            src={selectedTagInfo.contents_image}
                            alt={selectedTagInfo.contents_name}
                            style={{ width: '600px', height: '400px', objectFit: 'contain', cursor: 'pointer' }}
                            onClick={() => window.open(selectedTagInfo.contents_link, '_blank')}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default Tag_count_yearly_chart;