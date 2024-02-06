import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend, Label } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import { Select } from 'antd';
import customTagsData from '../data/custom.json'
import totaltop3 from '../data/total_top3.json'


const { Option } = Select;
const Custom_tags_count_yearly_chart = () => {
    const [data, setData] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [data1, setData1] = useState(totaltop3);




    const fetchData = (tag) => {
        try {
            // Instead of fetch, use the imported JSON data
            // setData1(totaltop3);
            setData(customTagsData);
            setSelectedTag(tag);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleButtonClick = (tag) => {
        fetchData(tag);
    };

    return (
        <div id="charDB" style={{ display: 'flex', flexDirection: 'row', marginLeft: '-250px',marginRight :'40px'}}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginRight: '20px', backgroundColor: '#f2f2f2' }}>
                <h2>분석페이지</h2>
                <ul>
                    <Analysticpagemenu></Analysticpagemenu>
                </ul>
                <Select
                    style={{ width: '200px', marginTop: '10px' }}
                    placeholder="Select a tag"
                    onChange={handleButtonClick}
                    value={selectedTag}
                >
                    <Option value="애견가">애견가</Option>
                    <Option value="애묘가">애묘가</Option>
                    <Option value="전국여행">전국여행</Option>
                    <Option value="해외여행">해외여행</Option>
                    <Option value="기차여행">기차여행</Option>
                    <Option value="육아">육아</Option>
                    <Option value="캠핑">캠핑</Option>
                    <Option value="sns사용자">sns사용자</Option>
                    <Option value="피트니스">피트니스</Option>
                    <Option value="건강식">건강식</Option>
                    <Option value="스포츠인">스포츠인</Option>
                    <Option value="시네필">시네필</Option>
                    <Option value="애서가">애서가</Option>
                    <Option value="애주가">애주가</Option>
                    <Option value="테니스인">테니스인</Option>
                    <Option value="뷰티">뷰티</Option>
                    <Option value="신발수집가">신발수집가</Option>
                    <Option value="포토그래퍼">포토그래퍼</Option>
                    <Option value="게임 및 엔터테인먼트">게임 및 엔터테인먼트</Option>
                    <Option value="기독교인">기독교인</Option>
                    <Option value="불교인">불교인</Option>
                    <Option value="시계수집가">시계수집가</Option>
                    <Option value="와인수집가">와인수집가</Option>

                </Select>
            </div>

            <div>

                <LineChart width={1500} height={600} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tick={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey={`user_tags.${selectedTag}`} stroke="#8884d8" />
                    {/* 그래프 안쪽에 선택한 옵션 표시 */}
                    <ReferenceLine
                        y={0}
                        stroke="#666"
                        strokeDasharray="3 3"
                        label={<Label value={selectedTag} position="insideBottomRight" fontSize={25} fontWeight="bold" offset={20} />} // offset을 추가하여 그래프에서 멀리 위치하게 함
                    />
                </LineChart>
                <br /><br /><br /><br />
                <h2>최근 5년 회원들의 태그 순위</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>순위</th>
                            {data1.map((yearData, yearIndex) => (
                                <th key={yearIndex} style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }} colSpan="2">
                                    {yearData.year}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2].map((rankIndex) => (
                            <tr key={rankIndex}>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{`${rankIndex + 1}위`}</td>
                                {data1.map((yearData, yearIndex) => (
                                    <React.Fragment key={yearIndex}>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{yearData.top3_tags[rankIndex].tagname}</td>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{yearData.top3_tags[rankIndex].tagcount}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <text x={150} y={620} textAnchor="middle" style={{ fontSize: '30px' }}>
                    {selectedTag}
                </text> */}

            </div>
        </div>
    );
};
export default Custom_tags_count_yearly_chart;