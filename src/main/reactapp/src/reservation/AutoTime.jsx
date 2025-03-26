import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function AutoTime(props) {
    const [saveTime, setSaveTime] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { startdate, dest } = queryString.parse(location.search);

    useEffect(() => {
        if (startdate && dest) {
            axios.get(`http://localhost:8080/resv/time?startdate=${startdate}&dest=${encodeURIComponent(dest)}`)
                .then(response => {
                    console.log(response.data);
                    setSaveTime(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [startdate, dest]);

    const onTimeSelect = (timeid) => {
        navigate(`/autoperson?timeid=${timeid}`);
    }

    return (
        <>
          <div>
            <div className='date-header'>
              <h2>{startdate} &nbsp;&nbsp;|&nbsp;&nbsp; {dest}행</h2>
            </div>
            <div className='time-button-container'>
              {saveTime.length > 0 && (
                <ul>
                  {saveTime
                    .sort((a, b) => {
                      const timeA = a.starttime.split(':').map(Number).reduce((h, m) => h * 60 + m); // 분 단위로 변환
                      const timeB = b.starttime.split(':').map(Number).reduce((h, m) => h * 60 + m); // 분 단위로 변환
                      return timeA - timeB; // 오름차순 정렬
                    })
                    .map((time, index) => {
                      const formattedTime = time.starttime.split(':').slice(0, 2).join(':');
                      return (
                        <li key={index}>
                          <button className='time-button' onClick={() => onTimeSelect(time.timeid)}>
                            {formattedTime}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </>
      );
}
