import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

export default function AutoPerson(props) {
    const [count, setCount] = useState(0);
    const [biid, setBiid] = useState(0);
    const [startdate, setStartdate] = useState('');
    const [starttime, setStarttime] = useState('');
    const [dest, setDest] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const { timeid } = queryString.parse(location.search);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. timeid에 해당하는 biid / startdate / dest / starttime 가져오기
                const timeresponse = await axios.get(`http://localhost:8080/resv/timeinfo?timeid=${timeid}`);

                console.log(timeresponse.data);

                setBiid(timeresponse.data.biid);
                setStartdate(timeresponse.data.startdate);
                setDest(timeresponse.data.dest);
                setStarttime(timeresponse.data.starttime);
            } catch (error) {
                console.log(error);
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
            navigate(`/autophone?timeid=${timeid}&person=${count}&startdate=${startdate}&dest=${dest}&starttime=${starttime}`);
        }
    };

    return (
        <>
            <div className="date-header">
                <h2>{startdate} &nbsp;&nbsp;|&nbsp;&nbsp; {dest}행</h2>
            </div>
            <div className="person-button">
                <div>
                <h1 style={{ margin: "0 auto"}}>인원수 선택</h1>
                </div>
                <div className='person-select'>
                <button className="decrement-button"  onClick={handleDecrement} disabled={count === 0}>-</button>
                <div className="count-display">{count}</div>
                <button className="increment-button" onClick={handleIncrement}>+</button>
                </div>
                <div>
                <button style={{ margin: "0 auto" ,width:"200px"}} className="select-button" onClick={handleSelect}>다음</button>
                </div>
            </div>
        </>
    );
}
