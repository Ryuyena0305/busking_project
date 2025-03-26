import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './timetable/timetable.css';
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
        <h1>버스 등록</h1>
        <form className='vContent createBox'>
          <div className='subTit'>버스기사 {' '}</div>
            <input
              className='subCont'
              type="text"
              name="driver"
              value={busForm.driver}
              onChange={onValueChange}
            />
            {' '}
          <br />
          <div className='subTit'>
            버스차량번호 {' '} </div>
            <input
              className='subCont'
              type="text"
              name="binum"
              value={busForm.binum}
              onChange={onValueChange}
            />
          {' '}
          <br />
          <div className='subTit'>
            버스등급 </div> 
          <div className='radioBox'>
            <div>
              <input className='radio'
                type="radio"
                name="btid"
                value="1"
                checked={busForm.btid === 1}
                onChange={onValueChange}
              />{' '}
              일반
            </div>
          
          
          <div>
            <input className='radio'
              type="radio"
              name="btid"
              value="2"
              checked={busForm.btid === 2}
              onChange={onValueChange}
            />{' '}
            우등
          </div>
          
          
          <div>
            <input className='radio'
              type="radio"
              name="btid"
              value="3"
              checked={busForm.btid === 3}
              onChange={onValueChange}
            />{' '}
            프리미엄
            </div>
          </div>
          <br />
          <hr />
          <button type="button" onClick={onCreate} className='adCreateBtn'>
            등록
          </button>
        </form>
      </div>
    </>
  );
}
