import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';

export default function Tcreate(props){
    const [starttime, setStarttime] = useState('');
    const [startdate, setStartdate] = useState('');
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');

    const handleCreate = async () => {
        const timeTableDto = {
            starttime : starttime,
            startdate : startdate,
            biid : biid,
            locid : locid
        }

        try{
            const response = await axios.post(`http://localhost:8080/timetable`, timeTableDto)
            console.log(response.data);
            if(response.data == ture){
                alert('스케줄 등록 성공')
                console.log('dd');
            }else{
                alert('스케줄 등록 실패');
            }

        }catch(error){
            console.log(error);
        }


    }
        



    return(<> 
        <div id="container"> 
            <h1> 스케줄 등록 </h1>
            <div className='content'>
                <div className='left'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Basic time picker" />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div className='right'>
                    <div className='subTit'>출발일자</div>
                    <input type="text" className='subCont' value={startdate} onChange={(e) => setStartdate(e.target.value)}/>

                    <div className='subTit'>출발시간</div>
                    <input type="text" className='subCont' value={starttime} onChange={(e) => setStarttime(e.target.value)}/>

                    <div className='subTit'>차량 정보</div>
                    <input type="text" className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)}/>

                    <div className='subTit'>터미널 정보</div>
                    <input type="text" className='subCont' value={locid} onChange={(e) => setLocid(e.target.value)}/>


                    <hr/>
                    <button type='button' onClick={handleCreate}>등록</button>

                </div>


            </div>

        </div> 
    </>)

}
                    {/*}
                    <div className='subTit'>차량정보</div>
                    <select className='subCont'>
                        <option>선택</option>
                        <option value="">00아 0000</option>
                        <option value="">00서 0000</option>
                        <option value="">00아 0000</option>
                        <option value="">00서 0000</option>
                    </select>

                    <div className='subTit'>터미널 정보</div>
                    <select className='subCont'>
                        <option>선택</option>
                        <option value="">천안</option>
                        <option value="">대구</option>
                        <option value="">부산</option>
                        <option value="">서울</option>
                    </select>*/}