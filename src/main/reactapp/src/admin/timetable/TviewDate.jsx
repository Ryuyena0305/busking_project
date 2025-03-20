import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import {MyTable, Page} from './TviewBus.jsx'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function TviewDate(props){
    const defaultDay = new Date().toISOString().split("T")[0];
    const [startDate, setStartDate] = useState([defaultDay]);
    const [getViewLists, setViewLists] = useState([])


    const onViewDate = async () => {
        if(!startDate) return;
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view/date?startdate=${startDate}`);
            setViewLists(response.data);
            //console.log(setViewLists);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        onViewDate();
    },[startDate]);


    // 선택한 날짜가 달라지면 set에 저장
    const dateChange = (e) => {
        const pickDate = e.target.value;
        setStartDate(pickDate);
    }

    return(<>
        <div id="container"> 
            <h1> 일자별 조회 </h1>
            <div className='pickContent'>
                <div className='viewTop'>
                    <div className='viewFind'>일자 선택</div>
                    <input type="date" className='subCont' value={startDate} onChange={dateChange} />
                    <button type='button' className='prints'>스케줄 출력</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th><th>출발일자</th><th>출발시간</th><th>차량정보</th><th>운전기사</th><th>도착지</th><th>비고</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            getViewLists.map((getViewList, index) => (
                                <tr className='bodyTr' key={index}>
                                    <td>{getViewList.timeid}</td>
                                    <td>{getViewList.startdate}</td>
                                    <td>{getViewList.starttime}</td>
                                    <td>{getViewList.binum}</td>
                                    <td>{getViewList.driver}</td>
                                    <td>{getViewList.dest}</td>
                                    <td><Link to={`/tview?timeid=${getViewList.timeid}`} className='link'><button type='button'>상세조회</button></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Page/>
    

            </div>
        </div>

</>)

}