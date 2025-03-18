import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';

export default function Tcreate(props){
    const [starttime, setStarttime] = useState('');
    const [startdate, setStartdate] = useState('');
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');

    const [selectLocs, setSelectLocs] = useState([]);
    const [selectBuss, setSelectBuss] = useState([]);

    // 지난 날짜, 지난 시간(수정 필요)
    const today = dayjs().format("YYYY-MM-DD");
    const nowTime = dayjs().format("HH:mm");
    const minTime  = startdate === today ? nowTime : "";

    useEffect(() => {
        getBus();
        getLoc();
    }, [])


    // select에서 사용할 차량정보 가져오기
    const getBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getbus`)
            console.log(response.data);
            setSelectBuss(response.data);
        }catch(error) {
            console.log(error);
        }
    } // getData end
    


    // select에서 사용할 터미널 정보 가져오기
    const getLoc = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getloc`)
            console.log(response.data);
            setSelectLocs(response.data);
        }catch(error){
            console.log(error);
        }
    } // getLoc end

    

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

                    
                    <div className='subTit'>차량 정보</div>
                    <select className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)}>
                        <option>선택</option>
                    {
                        selectBuss.map((selectBus, index) => {
                            return(
                                    <option key={index} value={`${selectBus.biid}`}>{selectBus.binum}</option>
                            )
                        })
                    }
                    </select>
                    <div className='subTit'>터미널 정보</div>
                    <select className='subCont' value={locid} onChange={(e) => setLocid(e.target.value)}>
                        <option>선택</option>
                    {
                        selectLocs.map((selectLoc, index) => {
                            return(
                                    <option key={index} value={`${selectLoc.locid}`}>{selectLoc.dest}</option>
                            )
                        })
                    }
                    </select>
                    <hr/>
                    <button type='button' onClick={handleCreate} className='createBtn'>등록</button>

                


            </div>

        </div> 
    </>)

}