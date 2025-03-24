import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './timetable/timetable.css';
import {Page} from './timetable/TviewBus'
export default function Read(props) {
  useEffect(() => {
    onRead();
  }, []);
  const onRead = async () => {
    const response = await axios.get('http://localhost:8080/bus/businfo');
    setBuses(response.data);
  };
  const [buses, setBuses] = useState([]);
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
            {buses.map((bus, index) => {
              return (
                <tr className='bodyTr'>
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
        <Page />
        </div>
      </div>
    </>
  );
}
