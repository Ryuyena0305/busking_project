import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { Link } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import GetBusData from '../components/Timetable';
import { useState } from 'react';
import { useEffect } from 'react';



export function MyTable(props){
    return(<>

    </>)
}


export function Page(props){
    return(<>
        <Stack spacing={2} className='page'>
            <Pagination count={10} shape="rounded" />
        </Stack> 
    </>)
}




export default function TviewBus(){
    const [biid, setBiid] = useState('');
    const [getViewLists, setViewLists] = useState({ })

    
    const onViewBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view/bus?biid=${biid}`);
            setViewLists(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

    // biid가 변경될 때마다 버스 정보를 조회
    useEffect(() => {
        if (biid) {
            onViewBus();  
        }
    }, [biid]);

    // GetBusData에서 전달받은 biid
    const paramBiid = (selectedBiid) => {
        setBiid(selectedBiid);
    }




    return(<>
            <div id="container"> 
                <h1> 버스별 조회 </h1>
                <div className='pickContent'>
                    <div className='viewTop'>
                    <GetBusData findBiid={paramBiid}  className='getBusData'/>
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
