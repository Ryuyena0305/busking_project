import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';  
import dayjs from 'dayjs';

export default function Dest() {
    const location = useLocation(); 
    const navigate = useNavigate();
    const { startdate } = queryString.parse(location.search);

    const formattedDate = startdate ? dayjs(startdate).format('YYYY-MM-DD') : '날짜가 선택되지 않았습니다.';

    const [dests, setDests] = useState([]); 

    useEffect(() => {
        if (startdate) {
            axios.get(`http://localhost:8080/resv/dest?startdate=${startdate}`)
                .then(response => {
                    setDests(response.data); 
                    console.log( response.data )
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [startdate]);

    const handleDest = (dest) => {
        navigate(`/time?startdate=${startdate}&dest=${encodeURIComponent(dest)}`);
    };

    return (
        <div>
            <h1>선택된 날짜</h1>
            <p>선택된 날짜: {formattedDate}</p>
            <h1>목적지를 선택해주세요</h1>
            <div>
                {dests.map((dest, index) => (
                    <button key={index} onClick={() => handleDest(dest)}>
                        {dest}
                    </button>
                ))}
            </div>
        </div>
    );
}
