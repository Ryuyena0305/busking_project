import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function Time(props) {
    const [saveTime, setSaveTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { startdate, dest } = queryString.parse(location.search);

    useEffect(() => {
        if (startdate && dest) {
            axios.get(`http://localhost:8080/resv/time?startdate=${startdate}&dest=${encodeURIComponent(dest)}`)
                .then(response => {
                    setSaveTime(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [startdate, dest]);

    const onTimeSelect = (selectedTime) => {
        setSelectedTime(selectedTime);
        navigate(`/person?startdate=${startdate}&dest=${encodeURIComponent(dest)}&time=${selectedTime}`);
    }

    return (
        <>
            <div>
                {saveTime.length > 0 && (
                    <ul>
                        {saveTime.map((time, index) => {
                            const formattedTime = time.split(':').slice(0, 2).join(':');
                            return (
                                <li key={index}>
                                    <button onClick={() => onTimeSelect(time)}>{formattedTime}</button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}
