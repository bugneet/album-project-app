import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import jsonData from '../data/yearly_tag.json'
import { Button, Select } from 'antd';
import contents from '../data/recommend.json'


const { Option } = Select;

const Yearly_chart = () => {
    const [selectedTagInfo, setSelectedTagInfo] = useState({});

    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2004);
    const [selectedMonth, setSelectedMonth] = useState(1);

    const [showSelects, setShowSelects] = useState(false);
    const [outputClicked, setOutputClicked] = useState(false);


    const initialDomain = [0, 10]; // 초기에 보이는 데이터의 범위를 설정
    const [xAxisDomain, setXAxisDomain] = useState(initialDomain);


    const handleXAxisDomainChange = (domain) => {
        setXAxisDomain(domain);
    }

    const handleOutputClick = () => {
        setOutputClicked(true);
        fetchData(selectedYear, selectedMonth);
        setShowSelects(true);
    };

    useEffect(() => {
        if (outputClicked) {
            fetchData(selectedYear, selectedMonth);
            setOutputClicked(false);
        }
    }, [selectedYear, selectedMonth, outputClicked]);

    const fetchData = (year, month) => {
        try {
            // axios.get 대신에 import한 JSON 데이터 사용
            const selectedData = jsonData.find((item) => item.year === year && item.month === month);
            setData(selectedData?.tags || []);

            // 첫 번째 태그를 기준으로 phototag를 찾아옴
            const matchingTags = selectedData?.tags.slice(0, 3).map(tag => {
                return contents.find(item => item.phototag.indexOf(tag.tagname) !== -1);
            });

            setSelectedTagInfo(matchingTags || []);
        } catch (error) {
            console.error('데이터 불러오기 오류:', error);
        }
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-250px', marginRight: '40px' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginRight: '20px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                <h2>분석페이지</h2>
                <Analysticpagemenu></Analysticpagemenu>


                {/* Center section - Select tags */}
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="year">연도 </label>
                        <Select
                            id="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            style={{ width: '120px' }}
                        >
                            {[...Array(20).keys()].map((index) => (
                                <Option key={index} value={2004 + index}>{2004 + index}</Option>
                            ))}
                        </Select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="month">달   </label>
                        <Select
                            id="month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            style={{ width: '120px', zIndex: '1', position: 'relative' }}
                        >
                            {[...Array(12).keys()].map((month) => (
                                <Option key={month + 1} value={month + 1}>{month + 1}</Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Button type="primary" onClick={handleOutputClick} style={{ borderRadius: '5px' }}>
                            출력
                        </Button>
                    </div>
                </div>
            </div>
            <hr></hr>
            {/* Right side - Chart */}

            <div id="charDB" style={{ flex: '1' }}>
                <BarChart width={1500} height={600} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="tagname"
                        interval={0} // 모든 레이블 표시
                        domain={xAxisDomain}
                        angle={0}
                        fontWeight={800}


                    />

                    <YAxis dataKey="tagcount" />
                    <Tooltip />
                    <Bar dataKey="tagcount" fill="#8884d8" categoryGap={30} />
                    <Brush
                        dataKey="tagname"
                        height={20}
                        stroke="#8884d8"
                        startIndex={xAxisDomain[0]}
                        endIndex={xAxisDomain[1]}
                        onChange={({ startIndex, endIndex }) => handleXAxisDomainChange([startIndex, endIndex])}
                        y={530}
                    />
                </BarChart>
                <br></br>
                <hr></hr>
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    {Array.isArray(selectedTagInfo) && selectedTagInfo.map((tagInfo, index) => (
                        tagInfo && tagInfo.phototag && (
                            <div key={index} style={{ marginRight: '20px', flex: '0 0 auto' }}>
                                <img
                                    src={tagInfo.contents_image}
                                    alt={tagInfo.contents_name}
                                    style={{ width: '450px', height: '300px', objectFit: 'contain', cursor: 'pointer', margin: '5px' }}
                                    onClick={() => window.open(tagInfo.contents_link, '_blank')}
                                />
                            </div>
                        )
                    ))}
                </div>

            </div>


        </div>
    );
};

export default Yearly_chart;