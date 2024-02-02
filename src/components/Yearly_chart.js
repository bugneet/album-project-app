import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Analysticpagemenu from './Analysticpagemenu';
import jsonData from '../data/yearly_tag.json'

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
    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;
        const label = payload.value;
        const labelLines = shouldWrapLabel(label) ? [label.slice(0, 3), label.slice(3)] : [label];

        return (
            <g transform={`translate(${x},${y})`}>
                {labelLines.map((line, index) => (
                    <text
                        key={index}
                        x={0}
                        y={index * 15} // 줄바꿈 간격 조절
                        dy={5}
                        textAnchor="start"
                        transform={`rotate(45)`}
                        fontSize="10"
                        fontFamily="Arial"
                        fill="#666"
                    >
                        {line}
                    </text>
                ))}
            </g>
        );
    };
    const handleOutputClick = () => {
        setOutputClicked(true);
        fetchData(selectedYear, selectedMonth);
        setShowSelects(true)
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

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
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
                        <label htmlFor="year">연도 :</label>
                        <select id="year" value={selectedYear} onChange={handleYearChange}>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="month">달 :</label>
                        <select
                            id="month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            style={{ zIndex: '1', position: 'relative' }}
                        >
                            {[...Array(12).keys()].map((month) => (
                                <option key={month + 1} value={month + 1}>{month + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button onClick={handleOutputClick}>출력</button>
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
                            angle={-45}
                            tick={<CustomizedXAxisTick />}
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