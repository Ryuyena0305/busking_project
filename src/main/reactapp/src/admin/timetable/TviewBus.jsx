import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import GetBusData from '../components/Timetable';
import PaginationComponent from '../components/Pagination';



export default function TviewBus(){
    const [biid, setBiid] = useState('');
    const [getViewLists, setViewLists] = useState({ list: [], total: 0, pages: 1 })

    const [page, setPage] = useState(1); // 페이지 기본값
    const pageSize = 10; // 한페이지에 표시할 개수

    
    const onViewBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view/bus?biid=${biid}&page=${page}&pageSize=${pageSize}`);
            
            const {list, total} = response.data
            console.log(response.data);
            const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
            setViewLists({list, total, pages : totalPages});
        }catch(error){
            console.log(error);
        }
    }

    // biid가 변경될 때마다 버스 정보를 조회
    useEffect(() => {
        if (biid) {
            onViewBus();  
        }
    }, [biid, page]);

    // GetBusData에서 전달받은 biid
    const paramBiid = (selectedBiid) => {
        setBiid(selectedBiid);
    }

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setPage(newPage);  // 새로운 페이지 번호로 업데이트
        //console.log("New page selected:", newPage);
    }
    //console.log("getViewLists.pages", getViewLists.pages);



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
                                        <td>{getViewList.dname}</td>
                                        <td>{getViewList.dest}</td>
                                        <td><Link to={`/tview?timeid=${getViewList.timeid}`} className='link'><button type='button' className='viewBtn'>상세조회</button></Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>       
                    <PaginationComponent
                        count={getViewLists.pages || 1} page={page} onChange={handlePageChange}
                    />

                </div>
            </div>
    
    </>)

}
