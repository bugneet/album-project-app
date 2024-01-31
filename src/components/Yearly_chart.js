import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';



const Yearly_chart = () => {

    const [startYear, setStartYear] = useState(2004);
    const [startMonth, setStartMonth] = useState(1);
    const [endYear, setEndYear] = useState(2009);
    const [endMonth, setEndMonth] = useState(1);
    const [data, setData] = useState([]);

    //  출력시 등장

    // 그래프  
    const initialDomain = [0, 8]; // 초기에 보이는 데이터의 범위를 설정
    const [xAxisDomain, setXAxisDomain] = useState(initialDomain);

    const linkStyle = {
        border: '1px dotted #000',
        display: 'inline-block',
        textAlign: 'center',
        padding: '5px',
        color: '#000',
        textDecoration: 'none',
    };

    const hoverStyle = {
        borderColor: '#f00',
    };
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



    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/tag_chart_yearly/${startYear}/${startMonth}/${endYear}/${endMonth}/`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleButtonClick = () => {
        fetchData();
    };

    // useEffect(() => {
    //     // Fetch data when the component mounts or when date parameters change
    //     fetchData();
    // }, [startYear, startMonth, endYear, endMonth]);


    const handleStartYearChange = (event) => {
        setStartYear(event.target.value);
    };

    const handleStartMonthChange = (event) => {
        setStartMonth(event.target.value);
    };

    const handleEndYearChange = (event) => {
        setEndYear(event.target.value);
    };

    const handleEndMonthChange = (event) => {
        setEndMonth(event.target.value);
    };

    return (
        <div>


            <label>Start Year:</label>
            <select value={startYear} onChange={handleStartYearChange}>
                {/* Populate the options dynamically based on your requirements */}
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
            </select>

            <label>Start Month:</label>
            <select value={startMonth} onChange={handleStartMonthChange}>
                {/* Populate the options dynamically based on your requirements */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>

            </select>

            <label>End Year:</label>
            <select value={endYear} onChange={handleEndYearChange}>
                {/* Populate the options dynamically based on your requirements */}
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>

            </select>

            <label>End Month:</label>
            <select value={endMonth} onChange={handleEndMonthChange}>
                {/* Populate the options dynamically based on your requirements */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>

            </select>
            <button onClick={handleButtonClick}>Show Graph</button>
            <div id="charDB">
                <BarChart width={1200} height={400} data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="tagname"
                        interval={0} // 모든 레이블 표시
                        domain={xAxisDomain}
                        angle={-45}
                        tick={<CustomizedXAxisTick />} />

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
            <br /><br /><br />
        </div>
    );
};

export default Yearly_chart;