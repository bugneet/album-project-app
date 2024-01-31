import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, CartesianAxis, Tooltip, Legend, Line, CartesianGrid, ComposedChart, Area, Scatter } from 'recharts';

const Total_chart = () => {
    const [data, setData] = useState({
        tagname: '',
        tagcount: 0,
    })

    // 서버에 요청해서 데이터 받아옴
    // state 값 저장     
    const loadData = async () => {
        const response = await axios.get('http://localhost:8000/chart_db/');
        console.log("response.data", response.data.phototag);
        setData(response.data);
    }
    // 렌더링할 때마다 호출 
    // 빈배열 : loadData() 한 번만 호출
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div id="chardDB">
            <BarChart width={1000} height={400} data={data}>
                <Bar dataKey="tagcount" barSize={30} fill="#8884d8" />
                <XAxis dataKey="tagname" fontSize={10} />
                <YAxis />
            </BarChart>

            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="tagname" />
                <PolarRadiusAxis />
                <Radar name="name" dataKey="tagcount" fill="magenta" fillOpacity={0.6} />
            </RadarChart>

            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="tagname" fontSize={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="tagcount" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="tagcount" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="tagcount" stroke="#ff7300" />
                <Scatter dataKey="tagcount" fill="red" />
            </ComposedChart>

            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tagname" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tagcount" stroke="#8884d8" activeDot={{ r: 8 }} />

            </LineChart>
        </div>


    );
};

export default Total_chart;