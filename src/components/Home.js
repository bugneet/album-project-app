import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>홈입니다</h1>
            {
                localStorage.getItem("username")
            }
            <p>방문을 환영합니다!</p>
        </div>
    );
};

export default Home;