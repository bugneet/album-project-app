import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianAxis, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';



const Yearly_chart = () => {

    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2011);
    const [selectedMonth, setSelectedMonth] = useState(1);


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
        fetchData(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    const fetchData = async (year, month) => {
        try {
            const response = await axios.get(`http://localhost:8000/tag_chart_yearly`);
            const selectedData = response.data.find((item) => item.year === year && item.month === month);
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
        <div>
            <div>
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {/* Add options for the years available in your data */}
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>

                    {/* ... Add more years as needed */}
                </select>
            </div>

            <div>
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {/* Add options for the months */}
                    {[...Array(12).keys()].map((month) => (
                        <option key={month + 1} value={month + 1}>{month + 1}</option>
                    ))}
                </select>
            </div>

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
                    <Bar dataKey="tagcount" fill="#8884d8" categoryGap={30} name={`Tag Count for ${selectedMonth}월`} />
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

export default Yearly_chart;