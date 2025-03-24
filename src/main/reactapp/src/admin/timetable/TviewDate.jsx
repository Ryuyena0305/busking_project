import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PaginationComponent from '../components/Pagination';


export default function TviewDate(props){
    const defaultDay = new Date().toISOString().split("T")[0];
    const [startDate, setStartDate] = useState([defaultDay]);
    const [getViewLists, setViewLists] = useState({list: [], total: 0, pages: 1})

    const [page, setPage] = useState(1); // 페이지 기본값
    const pageSize = 10; // 한페이지에 표시할 개수

    //const [excelLists, setExcelLists] = useState([]);

    const onExcelDate = async () =>{

        if (!startDate) return;

    try {
        const response = await axios.get(`http://localhost:8080/busking/excel?startdate=${startDate}`, {
            responseType: 'blob' // 엑셀 파일을 Blob 데이터로 받기
        });

        // Blob 데이터 생성
        const blob = new Blob([response.data], { type: "application/vnd.ms-excel" });

        // Blob을 URL로 변환
        const url = window.URL.createObjectURL(blob);

        //  가상의 <a> 태그 생성하여 다운로드 트리거
        const a = document.createElement("a");
        a.href = url;
        a.download = `${startDate}_bus_schedule.xls`; // 파일명 설정
        document.body.appendChild(a);
        a.click();

        //  URL과 <a> 태그 정리
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error("엑셀 다운로드 오류:", error);
    }

    }


    const onViewDate = async () => {
        if(!startDate) return;
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view/date?startdate=${startDate}&page=${page}&pageSize=${pageSize}`);

            const {list, total} = response.data
            console.log(response.data);
            const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
            setViewLists({list, total, pages : totalPages});
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        onViewDate();
    },[startDate, page]);


    // 선택한 날짜가 달라지면 set에 저장
    const dateChange = (e) => {
        const pickDate = e.target.value;
        setStartDate(pickDate);
    }


    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (event, newPage) => {
        setPage(newPage);  // 새로운 페이지 번호로 업데이트
        //console.log("New page selected:", newPage);
    }


    return(<>
        <div id="container"> 
            <h1> 일자별 조회 </h1>
            <div className='pickContent'>
                <div className='viewTop'>
                    <div className='viewFind'>일자 선택</div>
                    <input type="date" className='subCont' value={startDate} onChange={dateChange} />
                    <button type='button' className='prints' onClick={() => onExcelDate()}>다운로드(Excel)</button>

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
                <PaginationComponent
                    count={getViewLists.pages || 1} page={page} onChange={handlePageChange}
                />
            </div>
        </div>
    </>)

}