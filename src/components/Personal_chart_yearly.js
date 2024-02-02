import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import MypageSidemenu from './MypageSidemenu';


const Personal_chart_yearly = () => {
    const [jsonData, setJsonData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2021);
    const username = localStorage.getItem("username")



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/personal_chart_yearly/' + username);
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
        <div>
            <h1>{localStorage.getItem('username')}님의 연도별 개인분석입니다!</h1>
            <label>Select Year: </label>
            <select onChange={handleChangeYear} value={selectedYear}>
                {jsonData.map((item) => (
                    <option key={item.year} value={item.year}>
                        {item.year}
                    </option>
                ))}
            </select>

            {filteredData && (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Tooltip />
                        <Legend />
                        <Pie
                            data={filteredData.tags}
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
                                        {filteredData.tags[index].tagname}
                                    </text>
                                );
                            }}
                        >
                            {filteredData.tags.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Personal_chart_yearly;