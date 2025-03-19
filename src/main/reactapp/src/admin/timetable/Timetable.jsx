
import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import { Pagination, Stack } from '@mui/material';

// select에서 사용할 차량정보 가져오기
export default function GetBusData({findBiid}){
    const [biid, setBiid] = useState('');
    const [selectBuss, setSelectBuss] = useState([]);

    const getBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getbus`)
            //console.log(response.data);
            setSelectBuss(response.data);
        }catch(error) {
            console.log(error);
        }
    } //  end

    useEffect(() => {
        getBus();
    }, []);

    // biid가 변경될 때마다 biid를 GetBusData에 전달
    useEffect(() => {
       if (biid) {
            findBiid(biid);
        }
    }, [biid, findBiid]);

    const onReset = () => {
        
    }

    return(<>
        <div className='viewFind'>차량 정보</div>
        <select className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)}>
            <option value="">선택</option>
        {
            selectBuss.map((selectBus, index) => {
                return(
                        <option key={index} value={`${selectBus.biid}`}>{selectBus.binum}</option>
                )
            })
        }
        </select>
    </>)
}


// select에서 사용할 터미널 정보 가져오기
export function GetLocData({findLocid}){
    const [locid, setLocid] = useState('');
    const [selectLocs, setSelectLocs] = useState([]);

    const getLoc = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getloc`)
            //console.log(response.data);
            setSelectLocs(response.data);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLoc();
    }, [])

    // Locid가 변경될 때마다 biid를 GetBusData에 전달
    useEffect(() => {
        if (locid) {
                findLocid(locid);
            }
        }, [locid, findLocid]);

    return(<>
        <div className='viewFind'>터미널 정보</div>
            <select className='subCont' value={locid} onChange={(e) => setLocid(e.target.value)}>
                <option value="">선택</option>
            {
                selectLocs.map((selectLoc, index) => {
                    return(
                            <option key={index} value={`${selectLoc.locid}`}>{selectLoc.dest}</option>
                    )
                })
            }
            </select>
    </>)
}





export function GetBusData2(){
    const [biid, setBiid] = useState('');
    const [selectBuss, setSelectBuss] = useState([]);

    const getBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getbus`)
            //console.log(response.data);
            setSelectBuss(response.data);
        }catch(error) {
            console.log(error);
        }
    } //  end

    useEffect(() => {
        getBus();
    },[biid]);


    const onReset = () => {
        
    }

    return(<>
        <div className='viewFind'>차량 정보</div>
        <select className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)}>
            <option value="">선택</option>
        {
            selectBuss.map((selectBus, index) => {
                return(
                        <option key={index} value={`${selectBus.biid}`}>{selectBus.binum}</option>
                )
            })
        }
        </select>
    </>)
}







// // 테이블
// export function MyTable(props){
//     return(<>
//         <table>
//             <thead>
//                 <tr>
//                     <th>번호</th><th>출발일자</th><th>출발시간</th><th>차량정보</th><th>운전기사</th><th>도착지</th><th>비고</th>
//                 </tr>
//             </thead>
//             <tbody> 
//                 {
//                     getViewLists.map((getViewList, index) => (
//                         <tr className='bodyTr' key={index}>
//                             <td>{getViewList.timeid}</td>
//                             <td>{getViewList.startdate}</td>
//                             <td>{getViewList.starttime}</td>
//                             <td>{getViewList.binum}</td>
//                             <td>{getViewList.driver}</td>
//                             <td>{getViewList.dest}</td>
//                             <td><Link to={`/tview?timeid=${getViewList.timeid}`} className='link'><button type='button'>상세조회</button></Link></td>
//                         </tr>
//                     ))
//                 }
//             </tbody>
//         </table>
//     </>)
// }









// // 페이지네이션
// export function Page(props){
//     return(<>
//         <Stack spacing={2} className='page'>
//             <Pagination count={10} shape="rounded" />
//         </Stack> 
//     </>)
// }