import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';

import GetBusData, { GetLocData } from './Timetable';



export default function Tcreate(props){
    const [starttime, setStarttime] = useState('');
    const [startdate, setStartdate] = useState('');
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');


    // 지난 날짜, 지난 시간(수정 필요)
    const today = dayjs().format("YYYY-MM-DD");
    const nowTime = dayjs().format("HH:mm");
    const minTime  = startdate === today ? nowTime : "";



    // 등록버튼 클릭시 실행
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
            if(response.data == true){
                alert('스케줄 등록 성공')
                setStarttime('');
                setStartdate('');
                setBiid('');
                setLocid('');
            }else{
                alert('스케줄 등록 실패');
            }
        }catch(error){
            console.log(error);
        }
    } // handleCreate end



    return(<> 
        <div id="container"> 
            <h1> 스케줄 등록 </h1>
            <div className='vContent'>
                    <div className='subTit'>출발일자</div>
                    <input type="date" min={today} className='subCont' value={startdate} onChange={(e) => setStartdate(e.target.value)}/>

                    <div className='subTit'>출발시간</div>
                    <input type="time" min={minTime} className='subCont' value={starttime} onChange={(e) => setStarttime(e.target.value)}/>

                    <GetBusData />
                    <GetLocData />

                    <hr/>
                    <button type='button' onClick={handleCreate} className='createBtn'>등록</button>

                


            </div>

        </div> 
    </>)

}