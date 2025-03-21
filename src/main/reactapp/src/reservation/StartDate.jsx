import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function StartDate(props) {
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
            navigate(`/dest?startdate=${formattedDate}`);
        } else {
            alert('날짜를 선택해주세요!');
        }
    };

    return (
        <div>
            <h1>예매 페이지</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    // minDate={dayjs()} 
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}  
                    shouldDisableDate={(date) => !isDateAvailable(date)} 
                    renderInput={(params) => <input {...params} />}  
                />
            </LocalizationProvider>
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleDate}
            >
                다음
            </Button>
        </div>
    );
}
