import React, { useEffect, useState } from 'react';

const Yearly_chart_top3 = () => {
    const [data, setData] = useState([]);
    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/tag_chart_yearly_top3/');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // 컨텐츠 데이터 불러오기
        const fetchContents = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/recommend_contents2/'); // Django의 URL로 변경
                const jsonContents = await response.json();
                setContents(jsonContents);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };

        fetchContents();
    }, []);

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

    const oddTdStyle = {
        ...tdStyle,
        backgroundColor: '#f9f9f9',
    };

    return (
        <div>
            <h2>최근 5년 회원들의 태그 순위</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>순위</th>
                        {data.map((yearData, yearIndex) => (
                            <th key={yearIndex} style={thStyle} colSpan="2">
                                {yearData.year}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2].map((rankIndex) => (
                        <tr key={rankIndex}>
                            <td style={thStyle}>{`${rankIndex + 1}위`}</td>
                            {data.map((yearData, yearIndex) => (
                                <React.Fragment key={yearIndex}>
                                    <td style={tdStyle}>{yearData.top3_tags[rankIndex].tagname}</td>
                                    <td style={tdStyle}>{yearData.top3_tags[rankIndex].tagcount}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
                {contents.length > 0 && (
                    <div style={{ marginBottom: '20px', marginRight: '20px' }}>
                        <a href={contents[0].contents_link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={contents[0].contents_image}
                                alt={contents[0].contents_name}
                                style={{ maxWidth: '100%', height: 'auto', width: '300px' }}
                            />
                        </a>
                    </div>
                )}
                {contents.length > 1 && (
                    <div style={{ marginBottom: '100px', marginRight: '10px' }}>
                        <a href={contents[1].contents_link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={contents[1].contents_image}
                                alt={contents[1].contents_name}
                                style={{ maxWidth: '100%', height: 'auto', width: '300px' }}
                            />
                        </a>
                    </div>
                )}
                {contents.length > 2 && (
                    <div style={{ marginBottom: '20px' }}>
                        <a href={contents[2].contents_link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={contents[2].contents_image}
                                alt={contents[2].contents_name}
                                style={{ maxWidth: '100%', height: 'auto', width: '300px' }}
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Yearly_chart_top3;