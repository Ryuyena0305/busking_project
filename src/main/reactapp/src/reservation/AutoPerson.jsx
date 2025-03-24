import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

export default function AutoPerson(props) {
    const [count, setCount] = useState(0);
    const [startdate, setStartdate] = useState('');
    const [dest, setDest] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const { timeid } = queryString.parse(location.search);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeresponse = await axios.get(`http://localhost:8080/resv/timeinfo?timeid=${timeid}`);
                
                console.log(timeresponse.data);
                
                setStartdate(timeresponse.data.startdate);
                setDest(timeresponse.data.dest);
            } catch (error) {
                console.error('시간 정보 가져오기 실패:', error);
            }
        };

        if (timeid) {
            fetchData();
        }
    }, [timeid]);

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleSelect = () => {
        if (count >= 1) {
            navigate(`/resvseat?timeid=${timeid}&person=${count}`);
        } else {
            alert('1명 이상을 선택하세요.');
        }
    };

    return (
        <>
            <div className="date-header">
                <h2>{startdate} &nbsp;&nbsp;|&nbsp;&nbsp; {dest}행</h2>
            </div>
            <div className="person-button">
                <h1>인원수 선택</h1>
                <button className="decrement-button"  onClick={handleDecrement} disabled={count === 0}>-</button>
                <div className="count-display">{count}</div>
                <button className="increment-button" onClick={handleIncrement}>+</button>
                <button className="select-button" onClick={handleSelect}>다음</button>
            </div>
        </>
    );
}