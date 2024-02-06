import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import MypageSidemenu from './MypageSidemenu';



const ContentsTable = () => {
    const [contentsdata, Setcontentsdata] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/combined_api_view/${username}`);
                Setcontentsdata(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        {contentsdata.map((item, index) => (
                            <td key={item.contents_id} style={{ paddingRight: index < contentsdata.length - 1 ? '40px' : '0' }}>
                                <a href={item.contents_link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={item.contents_image}
                                        alt={item.contents_name}
                                        style={{ maxWidth: '350px', maxHeight: '300px', width: 'auto', height: 'auto' }}
                                    />
                                </a>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );





};

const YearlyPieChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                    data={data}
                    dataKey="tagcount"
                    nameKey="tagname"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                            <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                {data[index].tagname}
                            </text>
                        );
                    }}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

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
        width: '1400px',
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



const PersonalChartYearly = () => {
    const [jsonData, setJsonData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2023);
    const username = localStorage.getItem("username");

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
    }, []);

    const handleChangeYear = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const filteredData = jsonData.find((item) => item.year === selectedYear);

    return (
        <div id="chartDB">
            <div id='mypage_album_body'>

                <div id="menu">
                    <h2>마이페이지</h2>
                    <MypageSidemenu></MypageSidemenu>
                </div>
                <div id="content">
                    <div>
                        <h1>{localStorage.getItem('username')}님의 연도별 개인분석입니다!</h1>
                        <label>년도 선택: </label>
                        <select onChange={handleChangeYear} value={selectedYear}>
                            {jsonData.map((item) => (
                                <option key={item.year} value={item.year}>
                                    {item.year}
                                </option>
                            ))}
                        </select>
                        {filteredData && <YearlyPieChart data={filteredData.tags} />}
                    </div>
                    <br /><br /><br /><br /><br />
                    <ContentsTable />
                    {/* <div style={{ fontSize: '30px' }}>{localStorage.getItem('username')}님의 최근 5년간의 분석입니다!</div>


                    <Top3TagsTable data={jsonData} /> */}
                </div>

            </div>

        </div>


    );
};

export default PersonalChartYearly;

