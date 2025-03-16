import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
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
      alert('삭제 성공');
      navigate('/read');
    } else {
      alert('삭제 실패');
    }
  };

  return (
    <>
      {buses && (
        <div id="container">
          <h3>BUS 상세정보</h3>
          <p>버스기사 : {buses.driver}</p>
          <p>버스번호 : {buses.binum}</p>
          <p>버스등급 : {buses.btname}</p>
          <button onClick={() => handleEditClick(buses.biid)}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </div>
      )}
    </>
  );
}
