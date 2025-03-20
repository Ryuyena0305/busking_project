import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function Person(props) {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { startdate, dest, time } = queryString.parse(location.search);

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleSelect = () => {
        navigate(`/resvseat?startdate=${startdate}&dest=${encodeURIComponent(dest)}&time=${time}&person=${count}`);
    };

    return (
        <>
            <h1>인원수 선택</h1>
            <button onClick={handleDecrement} disabled={count == 0}>-</button>
            <div>{count}</div>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleSelect}>선택</button>
        </>
    );
}