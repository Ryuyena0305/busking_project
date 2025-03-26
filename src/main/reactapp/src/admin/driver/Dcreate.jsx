import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Dcreate(props){
    const [driverInfo, setDriverInfo] = useState({dname : '', ddate : '', dphone : '', dimg : null})

    
    const onInputChange = (e) => {
        setDriverInfo({...driverInfo, [e.target.name] : e.target.value})
    }

    const onFileChange = (e) => {
        setDriverInfo({...driverInfo, "dimg" : e.target.files[0]})
    }

    const navigate = useNavigate()
    const onCreate = async () => {
        const formData = new FormData()

        formData.append('dname', driverInfo.dname);
        formData.append('ddate', driverInfo.ddate);
        formData.append('dphone', driverInfo.dphone);
        formData.append('dimg', driverInfo.dimg);

        const option = {headers : {"Content-Type" : "multipart/form-data"}}
        const response = await axios.post('http://localhost:8080/driver', formData, option)
        const result = response.data
        if(result == true){
            alert('버스기사 등록이 완료되었습니다.');
            navigate('/home');
        }else{
            alert('버스기사 등록에 실패했습니다.')
        }
    }



    return(<>
        <div id='container'>
            <h1>버스기사 등록</h1>
            <div className='vContent'>
                <form>
                    <div className='subTit'>이름</div>
                    <input type="text" className='subCont' name='dname' value={driverInfo.dname} onChange={onInputChange}/>

                    <div className='subTit'>생년월일</div>
                    <input type="text" className='subCont' name='ddate' value={driverInfo.ddate} onChange={onInputChange}/>

                    <div className='subTit'>연락처</div>
                    <input type="text" className='subCont' name='dphone' value={driverInfo.dphone} onChange={onInputChange}/>

                    <div className='subTit'>프로필</div>
                    <input type="file" className='subCont profile' accept="image/*" onChange={onFileChange}/>
                    
                    <hr/>
                    
                    <button type='button' className='adCreateBtn' onClick={onCreate}>등록</button>
                </form>
            </div>
        </div>
    </>)

}