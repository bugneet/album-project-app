import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, CartesianAxis, Tooltip, Legend, Line, CartesianGrid, ComposedChart, Area, Scatter, Brush } from 'recharts';
import chartData from '../data/tags.json';
import totaltop3 from '../data/total_top3.json'
import Analysticpagemenu from './Analysticpagemenu';
import { Link } from 'react-router-dom';

const button = {
    backgroundColor: '#4285F4',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
};

const Total_chart_json = () => {
    const [data1, setData1] = useState([]);
    const [data, setData] = useState([]);
    const [contents, setContents] = useState([]);


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
                        fontSize="12"
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
        setData1(chartData);

        setData(totaltop3)

        // 컨텐츠 데이터 불러오기
        const fetchContents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/recommend_contents3/'); // Django의 URL로 변경
                const jsonContents = await response.json();
                setContents(jsonContents);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };

        fetchContents();
    }, []);

    // Rest of your component logic
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        fontSize: '16px',
        textAlign: 'center',
    };

    const thTdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2',
    };

    const tdStyle = {
        ...thTdStyle,
        backgroundColor: '#fff',
    };

    return (
        <div id="charDB" style={{ display: 'flex', flexDirection: 'row', marginLeft: '-250px',marginRight :'40px' }}>
            {/* Left side - Menu */}
            <div id="analysticmenu" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginRight: '20px', backgroundColor: '#f2f2f2',textAlign: 'center'}}>
                <h2>분석페이지</h2>
                <Analysticpagemenu></Analysticpagemenu>
            </div>

            {/* Right side - Chart */}
            <div id="chartContainer" style={{ flex: '1' }}>
                <BarChart
                    width={1500}
                    height={600}
                    data={data1}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
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

                    <Bar dataKey="tagcount" fill="#8884d8" categoryGap={30} />
                    <Brush
                        dataKey="tagname"
                        height={20}
                        stroke="#8884d8"
                        startIndex={xAxisDomain[0]}
                        endIndex={xAxisDomain[1]}
                        onChange={({ startIndex, endIndex }) => handleXAxisDomainChange([startIndex, endIndex])}
                        y={550}
                    />
                </BarChart>
                <br /><br /><br /><br />
                <h2>최근 5년 회원들의 태그 순위</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>순위</th>
                            {data.map((yearData, yearIndex) => (
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
                                {data.map((yearData, yearIndex) => (
                                    <React.Fragment key={yearIndex}>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{yearData.top3_tags[rankIndex].tagname}</td>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{yearData.top3_tags[rankIndex].tagcount}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            <div>
                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                    {contents.map((content, index) => (
                        <div key={index} style={{ marginBottom: '20px', marginRight: '20px', flex: '0 0 auto' }}>
                            <a href={content.contents_link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={content.contents_image}
                                    alt={content.contents_name}
                                    style={{ maxWidth: '100%', height: 'auto', width: '300px' }}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Total_chart_json;