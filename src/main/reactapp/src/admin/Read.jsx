import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './timetable/timetable.css';

import PaginationComponent from './components/Pagination';


export default function Read(props) {
  const [buses, setBuses] = useState({list: [], total: 0, pages: 1});

  const [page, setPage] = useState(1); // 페이지 기본값
  const pageSize = 10; // 한페이지에 표시할 개수


  const onRead = async () => {
    try{
      const response = await axios.get(`http://localhost:8080/bus/businfo?page=${page}&pageSize=${pageSize}`);

      const {list, total} = response.data
      console.log(response.data);
      const totalPages = Math.ceil(total / pageSize) // 전체 페이지수 구하기
      setBuses({list, total, pages : totalPages});
    }catch(error){
      console.log(error);
    }
    
  };

  useEffect(() => {
    onRead();
  }, [page]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (event, newPage) => {
    setPage(newPage);  // 새로운 페이지 번호로 업데이트
    //console.log("New page selected:", newPage);
  }
  //console.log("getViewLists.pages", getViewLists.pages);
  
  return (
    <>
      <div id="container">
        <h1>버스 정보</h1>
        <div className='pickContent'>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>버스기사</th>
              <th>버스차량번호</th>
              <th>버스등급</th>
              <th>좌석</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {buses.list && buses.list.map((bus, index) => {
              return (
                <tr className='bodyTr' key={index}>
                  <td>{bus.biid}</td>
                  <td>{bus.driver}</td>
                  <td>{bus.binum}</td>
                  <td>{bus.btname}</td>
                  <td>
                    <Link to={`/businfoseat?biid=${bus.biid}`} className='link'>
                      <button>좌석보기</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/bus/view?biid=${bus.biid}`} className='link'>
                      <button>상세정보</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationComponent
            count={buses.pages || 1} page={page} onChange={handlePageChange}
        />
        
        </div>
      </div>
    </>
  );
}
