import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 추가
import { koKR } from '@mui/x-date-pickers/locales';

dayjs.locale('ko'); // dayjs의 기본 로케일을 한국어로 설정

export default function AutoStartDate(props) {
    const [saveDates, setSaveDates] = useState([]);  
    const [selectedDate, setSelectedDate] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8080/resv/date')
            .then(response => {
                setSaveDates(response.data); 
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const isDateAvailable = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');  
        return saveDates.includes(formattedDate);
    };

    const handleDate = () => {
        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            navigate(`/autodest?startdate=${formattedDate}`);
        } else {
            alert('날짜를 선택해주세요!');
        }
    };

    return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko" localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}>
    
                <div className="date-header">
                    <h1>예매 페이지</h1>
                </div>
                <div className="emaildiv">
    
    
                    <StaticDatePicker
                        minDate={dayjs()}
                        value={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                        shouldDisableDate={(date) => !isDateAvailable(date)}
                        format="YYYY-MM-DD" // 연-월-일 형식으로 변경
                        renderInput={(params) => <input {...params} />}
                    />
    
    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDate}
                    >
                        다음
                    </Button>
                </div>
            </LocalizationProvider>
        );
}