import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import MypageSidemenu from './MypageSidemenu';

const Top3TagsTable = ({ data }) => {
    const getTop3TagsByYear = (year) => {
        const yearData = data.find((entry) => entry.year === year);
        if (!yearData) return [];

        return yearData.tags
            .sort((a, b) => b.tagcount - a.tagcount)
            .slice(0, 3)
            .map((tag, index) => ({ ...tag, index: `Top ${index + 1}` }));
    };

    const uniqueYears = [...new Set(data.map((entry) => entry.year))].filter((year) => year >= 2019 && year <= 2023);


    const tableStyle = {
        width: '900px',
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

    const oddTdStyle = {
        ...tdStyle,
        backgroundColor: '#f9f9f9',
    };

    // ...

    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={thStyle}></th>
                    {uniqueYears.map((year) => (
                        <React.Fragment key={year}>
                            <th colSpan="2" style={thStyle}>{year}</th>
                        </React.Fragment>
                    ))}
                </tr>
            </thead>
            <tbody>
                {['1위', '2위', '3위'].map((index) => (
                    <tr key={index}>
                        <td style={thStyle}>{index}</td>
                        {uniqueYears.map((year) => (
                            <React.Fragment key={year}>
                                <td style={tdStyle}>{getTop3TagsByYear(year)[parseInt(index) - 1] ? getTop3TagsByYear(year)[parseInt(index) - 1].tagname : ''}</td>
                                <td style={tdStyle}>{getTop3TagsByYear(year)[parseInt(index) - 1] ? getTop3TagsByYear(year)[parseInt(index) - 1].tagcount : ''}</td>
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Personal_chart = () => {
    const username = localStorage.getItem("username")
    const [jsonData, setJsonData] = useState([]);


    const [data, setData] = useState({
        tagname: '',
        tagcount: 0,
        // login_id: '',
    })

    const initialDomain = [0, 25]; // 초기에 보이는 데이터의 범위를 설정
    const [xAxisDomain, setXAxisDomain] = useState(initialDomain);

    const handleXAxisDomainChange = (domain) => {
        setXAxisDomain(domain);
    }
    const shouldWrapLabel = (label) => label.length >= 4;
    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;
        const label = payload.value;
        const labelLines = shouldWrapLabel(label) ? [label.slice(0, 5), label.slice(5)] : [label];

        return (
            <g transform={`translate(${x},${y})`}>
                {labelLines.map((line, index) => (
                    <text
                        key={index}
                        x={0}
                        y={index * 15 + 5} // 줄바꿈 간격 조절
                        dy={5}
                        textAnchor="start"
                        transform={`rotate(45)`}
                        fontSize="13"
                        fontFamily="Arial"
                        fill="#666"
                        fontWeight={'1000'}
                    >
                        {line}
                    </text>
                ))
                }
            </g >
        );
    };
    // 서버에 요청해서 데이터 받아옴
    // state 값 저장     
    const loadData = async () => {
        // const response = await axios.get('http://localhost:8000/personal_chart/' + localStorage.getItem("id"));
        const response = await axios.get('http://localhost:8000/personal_chart/' + username);
        console.log("response.data", response.data.phototag);
        // console.log("response.data.login_id", response.data.login_id);

        setData(response.data);
    }
    // 렌더링할 때마다 호출 
    // 빈배열 : loadData() 한 번만 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/personal_chart_yearly/${username}`);
                setJsonData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        loadData();
    }, []);


    return (
        <div id="chartDB">
            <div id='mypage_album_body'>

                <div id="menu">
                    <h2>마이페이지</h2>
                    <MypageSidemenu></MypageSidemenu>
                </div>
                <div id="content">
                    <div className="checkbox-container">
                        {localStorage.getItem('username')}님의 개인 분석 결과입니다!
                    </div>
                    <div id="charDB">
                        <BarChart
                            width={1000}
                            height={600}
                            data={data}

                            margin={{ top: 20, right: 40, left: -20, bottom: 50 }}
                        >
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

                                height={20}
                                stroke="#8884d8"
                                startIndex={xAxisDomain[0]}
                                endIndex={xAxisDomain[1]}
                                onChange={({ startIndex, endIndex }) => handleXAxisDomainChange([startIndex, endIndex])}
                                y={650}
                            />
                        </BarChart>
                    </div>
                    <div style={{ fontSize: '30px' }}>{localStorage.getItem('username')}님의 최근 5년간의 분석입니다!</div>


                    <Top3TagsTable data={jsonData} />
                </div>

            </div>

        </div>
    );
};

export default Personal_chart;