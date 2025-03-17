import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { Link } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function MyTable(props){
    return(<>
        <table>
            <thead>
                <tr>
                    <th>번호</th><th>출발일자</th><th>출발시간</th><th>차량정보</th><th>운전기사</th><th>도착지</th><th>비고</th>
                </tr>
            </thead>
            <tbody> 
                <tr className='bodyTr'>
                    <td>1</td><td>2020.02.20</td><td>06:00</td><td>39서2934</td><td>전은서</td><td>부산</td>
                    <td><Link className='link'><button type='button'>상세조회</button></Link></td>
                </tr>

                
            </tbody>
        </table>
    </>)
}
export { MyTable };

function Page(props){
    return(<>
        <Stack spacing={2} className='page'>
            <Pagination count={10} shape="rounded" />
        </Stack> 
    </>)
}
export { Page };



export default function TviewBus(props){





    return(<>
            <div id="container"> 
                <h1> 버스별 조회 </h1>
                <div className='pickContent'>
                    <div className='pickTop'>
                        <div className='pickTit'>차량정보</div>
                        <select className='pickList'>
                            <option>선택</option>
                            <option value="">00아 0000</option>
                            <option value="">00서 0000</option>
                            <option value="">00아 0000</option>
                            <option value="">00서 0000</option>
                        </select>
                    </div>
                    <MyTable/>
                    <Page/>
        

                </div>
            </div>
    
    </>)

}
