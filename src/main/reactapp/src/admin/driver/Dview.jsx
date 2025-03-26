import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';




export default function Dview(props){

    const [ searchParams ] = useSearchParams();
    const searchDid = searchParams.get('did');
    //console.log(typeof searchDid, searchDid);

    const [drivers, setDrivers] = useState({dname : '', ddate : '', dphone : '', dprofile : ''})

    const navigate = useNavigate(); 

    useEffect( () => {
        onView();
    }, [searchDid])

    // 상세조회
    const onView = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/driver/view?did=${searchDid}`)
            setDrivers(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error)
        }
    }

    // 수정
    const handleUpdate = async () => {
        try{
            const response = await axios.put(`http://localhost:8080/driver`, drivers)
            if(response.data == true){
                alert('버스기사 수정이 완료되었습니다.');
                navigate('/home');
            }else{
                alert('버스기사 수정을 실패했습니다.');
            }
        }catch(error){
            console.log(error);
        }
    }

    const onValueChange = (e) => {
        setDrivers({...drivers, [e.target.name] : e.target.value})
    }


    // 삭제
    const handleDelete = async () => {
        try{
            const response = await axios.delete(`http://localhost:8080/driver?did=${searchDid}`)
            if(response.data == true){
                alert('버스기사 삭제가 완료되었습니다.');
                navigate('/home');
            }else{
                alert('버스기사 삭제를 실패했습니다.')
            }
        }catch(error){
            console.log(error);
        }
    }

    // 스케줄 로그 페이지 이동
    const handleViewLog = (searchDid) => {
        navigate(`/dviewlog?did=${searchDid}`)
    }


    return(<>
        <div id='container'>
            <h1>버스기사 상세 조회</h1>
            <div className='adDview'>
                {drivers && (<>
                    <div className='profileBox'>
                        <img src={"http://localhost:8080/upload/" + (drivers.dprofile == null ? "default.jpg" : drivers.dprofile)} />
                        {/* <img src={`/build/resources/main/static/upload`} value={drivers.dprofile}/> */}
                    </div>

                    <div className='subTit'>이름</div>
                    <input type="text" className='subCont' name='dname' value={drivers.dname} onChange={onValueChange}/>

                    <div className='subTit'>생년월일</div>
                    <input type="text" className='subCont' name='ddate' value={drivers.ddate} onChange={onValueChange}/>

                    <div className='subTit'>연락처</div>
                    <input type="text" className='subCont' name='dphone' value={drivers.dphone} onChange={onValueChange}/>

                    <hr />
                    <div className='adDviewBtnBox'>
                        <button type='button' onClick={handleUpdate} className='dvUpdateBtn'>수정</button> <br />
                        <button type='button' onClick={handleDelete} className='dvDeleteBtn'>삭제</button> <br />
                    </div>
                    <button type='button' onClick={() => handleViewLog(searchDid)} className='viewLogBtn'>스케줄 조회</button>
                </>)}
            </div>
        </div>
    </>)
}