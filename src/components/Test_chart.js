import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
const Test_chart = () => {
    const data = [
        {
            subject: '일상', A: 120, B: 110, fullMark: 150,
        },
        {
            subject: '비행기', A: 98, B: 130, fullMark: 150,
        },
        {
            subject: '아기', A: 86, B: 130, fullMark: 150,
        },
        {
            subject: '건배', A: 99, B: 100, fullMark: 150,
        },
        {
            subject: '셀카', A: 85, B: 90, fullMark: 150,
        },
        {
            subject: '동물', A: 65, B: 85, fullMark: 150,
        },
    ];
    return (
        <div>
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" fill="blue" fillOpacity={0.6} />
            </RadarChart>
        </div>
    );
};

export default Test_chart;