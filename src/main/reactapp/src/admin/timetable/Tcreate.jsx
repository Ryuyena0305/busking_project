import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';

import GetBusData, { GetDriverData, GetLocData } from '../components/Timetable';
import { useNavigate } from 'react-router-dom';



export default function Tcreate(props){
    // 날짜, 시간 기본값 설정
    const defaultDate = new Date().toISOString().split("T")[0];
    const defaultTime = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });

    const defaultSelectDate = () => {}
    const defaultSelectTime = () => {}

    useEffect( () => {
        defaultSelectDate();
    },defaultDate)

    useEffect( () => {
        defaultSelectTime();
    }, defaultTime)

    

    const [starttime, setStarttime] = useState(defaultTime);
    const [startdate, setStartdate] = useState(defaultDate);
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');
    const [did, setDid] = useState('');

    // 지난 날짜, 지난 시간(수정 필요) 선택 불가
    const today = dayjs().format("YYYY-MM-DD");
    const nowTime = dayjs().format("HH:mm");
    const minTime  = startdate === today ? nowTime : "";




    // 등록버튼 클릭시 실행
    const navigate = useNavigate()
    const handleCreate = async () => {
        const timeTableDto = {
            starttime : starttime,
            startdate : startdate,
            biid : biid,
            locid : locid,
            did : did
        }
        try{
            const response = await axios.post(`http://localhost:8080/timetable`, timeTableDto)
            console.log(response.data);
            if(response.data == true){
                alert('스케줄 등록 성공');
                navigate("/home");
            }else{
                alert('스케줄 등록 실패');
            }
        }catch(error){
            console.log(error);
        }
    }

    
    // GetBusData에서 전달받은 biid
    const paramBiid = (selectedBiid) => {
        setBiid(selectedBiid);
    }

    // GetLocData에서 전달받은 locid
    const paramLocid = (selectedLocid) => {
        setLocid(selectedLocid);
    }

    // GetDriverData에서 전달받은 Did
    const paramDid = (selectedDid) => {
        setDid(selectedDid);
    }
    

    return(<> 
        <div id="container"> 
            <h1> 스케줄 등록 </h1>
            <div className='adTcreate'>
                <div className='subTit'>출발일자</div>
                <input type="date" min={today} className='subCont' value={startdate} onChange={(e) => setStartdate(e.target.value)}/>

                <div className='subTit'>출발시간</div>
                <input type="time" min={minTime} className='subCont' value={starttime} onChange={(e) => setStarttime(e.target.value)}/>

                <GetBusData findBiid={paramBiid} />
                <GetDriverData findDid={paramDid}/>
                <GetLocData findLocid={paramLocid}/>

                <hr/>
                <button type='button' onClick={handleCreate} className='adCreateBtn'>등록</button>
            </div>
        </div> 
    </>)

}