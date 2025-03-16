import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create(props) {
  const [busForm, setBusForm] = useState({ driver: '', binum: '', btid: 1 }); // 기본값 1(일반)

  const onValueChange = (e) => {
    const value =
      e.target.name === 'btid' ? parseInt(e.target.value) : e.target.value;
    setBusForm({ ...busForm, [e.target.name]: value });
  };

  const navigate = useNavigate();

  const onCreate = async () => {
    const response = await axios.post(
      'http://localhost:8080/bus/businfo',
      busForm
    );
    if (response.data === true) {
      alert('등록 성공');
      navigate('/read');
    } else {
      alert('등록 실패');
    }
  };

  return (
    <>
      <div id="container">
        <h3>BUS 등록 페이지</h3>
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
          <button type="button" onClick={onCreate}>
            등록
          </button>
        </form>
      </div>
    </>
  );
}
