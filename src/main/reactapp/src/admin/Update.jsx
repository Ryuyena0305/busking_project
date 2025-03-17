import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './timetable/timetable.css'
export default function Update(props) {
  const [searchParams] = useSearchParams();
  const biid = searchParams.get('biid');
  const [busForm, setBusForm] = useState({
    driver: '',
    binum: '',
    btid: 1,
    biid: biid,
  });
  const onValueChange = (e) => {
    const value =
      e.target.name === 'btid' ? parseInt(e.target.value) : e.target.value;
    setBusForm({ ...busForm, [e.target.name]: value });
  };

  const navigate = useNavigate();
  const onUpdate = async () => {
    console.log(biid);
    console.log(busForm);
    const response = await axios.put(
      `http://localhost:8080/bus/businfo`,
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
        <h1>BUS 수정 페이지</h1>
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
          <button type="button" onClick={onUpdate} className='createBtn'>
            수정
          </button>
        </form>
      </div>
    </>
  );
}
