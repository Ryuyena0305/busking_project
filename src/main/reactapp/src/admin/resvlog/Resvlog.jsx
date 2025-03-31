import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import PaginationComponent from '../components/Pagination';

export default function Resvlog(props) {

    const [logs, setlogs] = useState({list: [], total: 0, pages: 1})

    const [page, setPage] = useState(1); // 페이지 기본값
    const pageSize = 10; // 한페이지에 표시할 개수

    const getLog = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/resvlog?page=${page}&pageSize=${pageSize}`)

            const {list, total} = response.data
            console.log(response.data);
            const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
            setlogs({list, total, pages : totalPages});
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=> {
        getLog();
    },[page])


    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setPage(newPage);  // 새로운 페이지 번호로 업데이트
        //console.log("New page selected:", newPage);
    }
    //console.log("getViewLists.pages", getViewLists.pages);



    return(<>
        <div id="container">
            <h1>예매로그</h1>
            <div className='pickContent'>
                <div className='tableBox2'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width : '6%'}}>번호</th>
                                <th>출발일자</th>
                                <th>출발시간</th>
                                <th>터미널</th>
                                <th>좌석번호</th>
                                <th>금액</th>
                                <th style={{width : '17%'}}>이메일</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    logs.list && logs.list.map( (log, index)=> (
                                        <tr  className='bodyTr' key={index}>
                                            <td>{log.resvid}</td>
                                            <td>{log.startdate}</td>
                                            <td>{log.starttime}</td>
                                            <td>{log.dest}</td>
                                            <td>{log.bsnum}</td>
                                            <td>{log.total}</td>
                                            <td>{log.email}</td>
                                            <td>{log.state ? "탑승완료" : "미탑승"}</td>
                                        </tr>
                                    ))
                                }

                        </tbody>
                    </table>
                </div>
                <PaginationComponent
                    count={logs.pages || 1} page={page} onChange={handlePageChange}
                />
                

            </div>
        </div>
    </>)
}