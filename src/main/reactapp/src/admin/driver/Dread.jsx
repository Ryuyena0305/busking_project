import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';

import PaginationComponent from '../components/Pagination';
import { Link } from 'react-router-dom';


export default function Dread(props){
    const [drivers, setDrivers] = useState({ list: [], total: 0, pages: 1 })

    const [page, setPage] = useState(1); // 페이지 기본값
    const pageSize = 10; // 한페이지에 표시할 개수

    const onRead = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/driver?page=${page}&pageSize=${pageSize}`)
            
            const {list, total} = response.data
            console.log(response.data);
            const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
            setDrivers({list, total, pages : totalPages});
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        onRead();
    }, [page])

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setPage(newPage);  // 새로운 페이지 번호로 업데이트
        //console.log("New page selected:", newPage);
    }

    return(<>
        <div id='container'>
            <h1>버스기사 조회</h1>
            <div className='pickContent'>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th><th>이름</th><th>생년월일</th><th>연락처</th><th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            drivers.list && drivers.list.map( (driver, index) => {
                                return(
                                    <tr className='bodyTr' key={index}>
                                        <td>{driver.did}</td>
                                        <td>{driver.dname}</td>
                                        <td>{driver.ddate}</td>
                                        <td>{driver.dphone}</td>
                                        <td><Link to={`/dview?did=${driver.did}`} className='link'><button type='button' className='viewBtn'>상세조회</button></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationComponent
                    count={drivers.pages || 1} page={page} onChange={handlePageChange}
                />
            </div>
        </div>
    </>)
}