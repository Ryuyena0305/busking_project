import * as React from 'react';
import axios from 'axios';
import './timetable.css';
//import { Page} from './Timetable.jsx'
import { GetLocData } from '../components/Timetable';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function TviewLoc(){
    const [locid, setLocid] = useState('');
    const [getViewLists, setViewLists] = useState({})


    const onViewLoc = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view/loc?locid=${locid}`);
            setViewLists(response.data);
            console.log(setViewLists);
        }catch(error){
            console.log(error);
        }
    }

    // locid가 변경될 때마다 버스 정보를 조회
    useEffect(() => {
        if (locid) {
            onViewLoc();  
        }
    }, [locid]);

    // GetBusData에서 전달받은 locid
    const paramLocid = (selectedLocid) => {
        setLocid(selectedLocid);
    }




    return(<>
            <div id="container"> 
                <h1> 지역별 조회 </h1>
                <div className='pickContent'>
                    <div className='viewTop'>
                    <GetLocData findLocid={paramLocid}  className='getLocData'/>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th><th>출발일자</th><th>출발시간</th><th>차량정보</th><th>운전기사</th><th>도착지</th><th>비고</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                getViewLists.list && getViewLists.list.map((getViewList, index) => (
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
        

                </div>
            </div>
    
    </>)

}