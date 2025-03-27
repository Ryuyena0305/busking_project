import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './timetable/timetable.css';
export default function BusView(props) {
  const [searchParams] = useSearchParams();
  const biid = searchParams.get('biid');
  const navigate = useNavigate();
  const [buses, setBuses] = useState();
  useEffect(() => {
    onRead();
  }, []);

  const onRead = async () => {
    const response = await axios.get(
      `http://localhost:8080/bus/businfo/view?biid=${biid}`
    );
    setBuses(response.data);
  };
  const handleEditClick = (biid) => {
    navigate(`/update?biid=${biid}`);
  };
  const onDelete = async () => {
    const deleteResponse = await axios.delete(
      `http://localhost:8080/bus/businfo?biid=${biid}`
    );
    if (deleteResponse.data == true) {
      alert('버스 삭제를 성공했습니다.');
      navigate('/read');
    } else {
      alert('버스 삭제를 실패했습니다.');
    }
  };

  return (
    <>
      {buses && (
        <div id="container">
          <h1>BUS 상세정보</h1>
          <div className="vContent">
            <br /><br /><br /><br />
          <div className='subTit'>버스차량번호 </div> 
          <input type="text" className='subCont' value={buses.binum} disabled/>
          <div className='subTit'>버스등급 </div> 
          <br />
          <input type="text" className='subCont' value={buses.btname} disabled/> <br />
          <br />
          <hr />
          <button onClick={() => handleEditClick(buses.biid)} className='vUpdateBtn'>수정</button> <br />
          <button onClick={onDelete} className='vDeleteBtn'>삭제</button>
          </div>
        </div>
      )}
    </>
  );
}
