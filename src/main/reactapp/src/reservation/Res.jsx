import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export default function Res(props) {
    const [saveDates, setSaveDates] = useState([]);  
    const [selectedDate, setSelectedDate] = useState(null); 

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

    return (
        <>
            <h2>예매 페이지</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    minDate={dayjs()}
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}  
                    shouldDisableDate={(date) => !isDateAvailable(date)} 
                    renderInput={(params) => <input {...params} />}  
                />
            </LocalizationProvider>
        </>
    );
}
