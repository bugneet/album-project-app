import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import jsonData from '../data/yearly_tag.json'
import { Button, Select } from 'antd';

const { Option } = Select;

const Yearly_chart = () => {

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
    const shouldWrapLabel = (label) => label.length >= 4;

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
            // Instead of axios.get, use the imported JSON data
            const selectedData = jsonData.find((item) => item.year === year && item.month === month);
            setData(selectedData?.tags || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', position: 'relative' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ width: '200px', marginRight: '20px' }}>
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
            {showSelects && (
                <div id="charDB" style={{ flex: '1' }}>
                    <BarChart width={1200} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="tagname"
                            interval={0} // 모든 레이블 표시
                            domain={xAxisDomain}
                            angle={0}

                        />

                        <YAxis dataKey="tagcount" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tagcount" fill="#8884d8" categoryGap={30} />
                        <Brush
                            dataKey="tagname"
                            height={20}
                            stroke="#8884d8"
                            startIndex={xAxisDomain[0]}
                            endIndex={xAxisDomain[1]}
                            onChange={({ startIndex, endIndex }) => handleXAxisDomainChange([startIndex, endIndex])}
                            y={380}
                        />
                    </BarChart>
                </div>
            )}

        </div>
    );
};

export default Yearly_chart;