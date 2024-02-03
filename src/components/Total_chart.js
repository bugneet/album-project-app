import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, CartesianAxis, Tooltip, Legend, Line, CartesianGrid, ComposedChart, Area, Scatter, Brush } from 'recharts';
import { Link } from 'react-router-dom';
import chartData from '../data/tags.json';
import Analysticpagemenu from './Analysticpagemenu';

const Total_chart_json = () => {
    const [data, setData] = useState([]);
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
    const initialDomain = [0, 25]; // 초기에 보이는 데이터의 범위를 설정
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

    useEffect(() => {
        // Fetch or import your data here
        setData(chartData);
    }, []);

    // Rest of your component logic

    return (
        <div id="charDB" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ width: '200px', marginRight: '20px' }}>
                <h2>분석페이지</h2>
                <ul>
                    <Analysticpagemenu></Analysticpagemenu>
                </ul>
            </div>

            {/* Right side - Chart */}
            <div id="chartContainer" style={{ flex: '1' }}>
                <BarChart
                    width={1200}
                    height={400}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
        </div>
    );
};

export default Total_chart_json;