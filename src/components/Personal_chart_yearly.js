import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MypageSidemenu from './MypageSidemenu';


const Personal_chart_yearly = () => {
    const username = localStorage.getItem("username")

    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    const initialDomain = [0, 2]; // 초기에 보이는 데이터의 범위를 설정
    const [xAxisDomain, setXAxisDomain] = useState(initialDomain);

    const handleXAxisDomainChange = (domain) => {
        setXAxisDomain(domain);
    }
    const shouldWrapLabel = (label) => label.length >= 4;
    const CustomizedXAxisTick = (props) => {
        const { x, y, payload } = props;
        const label = payload.value;
        const labelLines = shouldWrapLabel(label) ? [label.slice(0, 4), label.slice(4)] : [label];

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
    // 서버에 요청해서 데이터 받아옴
    // // state 값 저장     
    // const loadData = async () => {
    //     // const response = await axios.get('http://localhost:8000/personal_chart/' + localStorage.getItem("id"));
    //     const response = await axios.get('http://localhost:8000/personal_chart_yearly/' + username);
    //     console.log("response.data", response.data.phototag);
    //     // console.log("response.data.login_id", response.data.login_id);

    //     setData(response.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/personal_chart_yearly/' + username);
                const result = await response.json();
                console.log(result)
                setData(result);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchData();
    }, []);

    const years = data.map((item) => item.year);

    return (
        <div>
            <h1>연도별 데이터 차트</h1>
            {Array.isArray(data) && (
                <div>
                    <select onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">연도 선택</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {selectedYear && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.find((item) => item.year === selectedYear)?.tags}>
                                <XAxis dataKey="tagname" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tagcount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>



            )}
        </div>
    );
};

export default Personal_chart_yearly;