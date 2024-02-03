import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import { Select } from 'antd';
import customTagsData from '../data/custom.json'

const { Option } = Select;
const Custom_tags_count_yearly_chart = () => {
    const [data, setData] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const fetchData = (tag) => {
        try {
            // Instead of fetch, use the imported JSON data
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
        <div id="charDB" style={{ display: 'flex', padding: '20px' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ width: '200px', marginRight: '20px' }}>
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
                    <Option value="전국여행">전국여행</Option>
                    <Option value="해외여행">해외여행</Option>
                    <Option value="기차여행">기차여행</Option>
                    <Option value="육아">육아</Option>
                    <Option value="캠핑">캠핑</Option>
                </Select>
            </div>

            <div>

                <LineChart width={1200} height={400} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tick={false} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={`user_tags.${selectedTag}`} stroke="#8884d8" />
                </LineChart>

            </div>
        </div>
    );
};
export default Custom_tags_count_yearly_chart;