import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PaginationComponent from '../components/Pagination';


export default function DviewLog(props){
    const [ searchParams ] = useSearchParams();
    const searchDid = searchParams.get('did');

    const navigate = useNavigate(); 

    const [timeLogs, setTimeLogs] = useState({ list: [], total: 0, pages: 1 })

    const [page, setPage] = useState(1); // 페이지 기본값
    const pageSize = 10; // 한페이지에 표시할 개수


    const onViewLog = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/driver/timelog?did=${searchDid}&page=${page}&pageSize=${pageSize}`)

            const {list, total} = response.data
            console.log(response.data);
            const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
            setTimeLogs({list, total, pages : totalPages});
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        onViewLog();
    }, [page]);

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setPage(newPage);  // 새로운 페이지 번호로 업데이트
    }
console.log(timeLogs);
    



    return(<>
        <div id='container'>
            <h1>{timeLogs.list[0]?.dname ? timeLogs.list[0].dname + " 기사 스케줄 조회" : "스케줄이 존재하지 않습니다"}</h1>
            <div className='pickContent'>
                <div className='tableBox2'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{width : '10%'}}>번호</th>
                                <th style={{width : '22.5%'}}>출발일자</th>
                                <th style={{width : '22.5%'}}>출발시간</th>
                                <th style={{width : '22.5%'}}>차량정보</th>
                                <th style={{width : '22.5%'}}>도착지</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                timeLogs.list && timeLogs.list.map( (timeLog, index) => {
                                    return(
                                        <tr className='bodyTr' key={index}>
                                        <td>{timeLog.timeid}</td>
                                        <td>{timeLog.startdate}</td>
                                        <td>{timeLog.starttime}</td>
                                        <td>{timeLog.binum}</td>
                                        <td>{timeLog.dest}</td>
                                    </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <PaginationComponent
                    count={timeLogs.pages || 1} page={page} onChange={handlePageChange}
                />

            </div>
        </div>
    
    </>)
}