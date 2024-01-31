import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import MypageSidemenu from './MypageSidemenu';


const Personal_chart_yearly = () => {
    const username = localStorage.getItem("username")

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
    // state 값 저장     
    const loadData = async () => {
        // const response = await axios.get('http://localhost:8000/personal_chart/' + localStorage.getItem("id"));
        const response = await axios.get('http://localhost:8000/personal_chart_yearly/' + username);
        console.log("response.data", response.data.phototag);
        // console.log("response.data.login_id", response.data.login_id);

        setData(response.data);
    }
    // 렌더링할 때마다 호출 
    // 빈배열 : loadData() 한 번만 호출
    useEffect(() => {
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
                            width={1200}
                            height={400}
                            data={data}

                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                    <div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Personal_chart_yearly;