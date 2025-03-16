import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Update(props) {
  const [searchParams] = useSearchParams();
  const biid = searchParams.get('biid');
  const [busForm, setBusForm] = useState({
    driver: '',
    binum: '',
    btid: 1,
  });
  const onValueChange = (e) => {
    const value =
      e.target.name === 'btid' ? parseInt(e.target.value) : e.target.value;
    setBusForm({ ...busForm, [e.target.name]: value });
  };

  const navigate = useNavigate();
  const onUpdate = async () => {
    const response = await axios.put(
      `http://localhost:8080/bus/businfo?bno=${biid}`,
      busForm
    );
    if (response.data == true) {
      alert('수정성공');
      navigate('/read');
    } else {
      alert('수정실패');
    }
  };
  return (
    <>
      <div id="container">
        <h3>BUS 수정 페이지</h3>
        <form>
          <label>
            버스기사 :{' '}
            <input
              type="text"
              name="driver"
              value={busForm.driver}
              onChange={onValueChange}
            />
          </label>{' '}
          <br />
          <label>
            버스차량번호 :{' '}
            <input
              type="text"
              name="binum"
              value={busForm.binum}
              onChange={onValueChange}
            />
          </label>{' '}
          <br />
          <label>버스등급 :</label> <br />
          <label>
            <input
              type="radio"
              name="btid"
              value="1"
              checked={busForm.btid === 1}
              onChange={onValueChange}
            />{' '}
            일반
          </label>
          <label>
            <input
              type="radio"
              name="btid"
              value="2"
              checked={busForm.btid === 2}
              onChange={onValueChange}
            />{' '}
            우등
          </label>
          <label>
            <input
              type="radio"
              name="btid"
              value="3"
              checked={busForm.btid === 3}
              onChange={onValueChange}
            />{' '}
            프리미엄
          </label>
          <br />
          <button type="button" onClick={onUpdate}>
            수정
          </button>
        </form>
      </div>
    </>
  );
}
