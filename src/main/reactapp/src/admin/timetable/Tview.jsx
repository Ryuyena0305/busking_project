import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import GetBusData, { GetLocData } from './Timetable';


export default function Tview(props){

    const [ searchParams ] = useSearchParams();
    const timeid = searchParams.get('timeid');

    const navigate = useNavigate(); 
    const [times, setTimes] = useState({starttime : '', starttime : '', biid : '', locid : ''});
    const [starttime, setStarttime] = useState('');
    const [startdate, setStartdate] = useState('');
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');

    useEffect(() => {
        onView();
    }, [timeid]);  


    // 상세 조회
    const onView = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view?timeid=${timeid}`);
            setTimes(response.data);
        }catch(error){
            console.log(error);
        }
    }


    // GetBusData에서 전달받은 biid
    const paramBiid = (selectedBiid) => {
        setBiid(selectedBiid);
    }

    // GetBusData에서 전달받은 locid
    const paramLocid = (selectedLocid) => {
        setLocid(selectedLocid);
    }

    // 수정
    const handleUpdate = async () => {
        try {
                const response = await axios.put(`http://localhost:8080/timetable/view`, times); 
                //console.log(response.data);
                if (response.data == true) {
                    alert('스케줄 수정 성공');
                    navigate("/");
                }else{
                    alert('스케줄 수정 실패')
                }
            }catch(error) {
                console.log(error);
            }
    };

    
    // 수정 이벤트
    const onValueChange = ( e ) => {
        setTimes( { ...times , [ e.target.name ] : e.target.value } )
    }

    
    // 삭제
    const handleDelete = async () => {
        try { 
            const deleteResponse = await axios.delete(`http://localhost:8080/timetable/view?timeid=${timeid}`);
            if (deleteResponse.data == true) {
                alert('삭제 성공');
                navigate("/");  
            }else{
                alert('삭제 실패');
            }
        } catch (error) {
            console.log(error);
        }
    };




    return(<>
        <div id="container">
                <h1>스케줄 상세 조회</h1>
                <div className="vContent">
                    {times && (<>
                            <div className='subTit'>출발일자</div>
                            <input type="date" name='startdate' className='subCont timeSubCont' value={times.startdate}
                                onChange={onValueChange}
                            />

                            <div className='subTit'>출발시간</div>
                            <input type="time" name='starttime' className='subCont timeSubCont' value={times.starttime}
                                onChange={onValueChange}
                            />

                            <GetBusData findBiid={paramBiid} className='getBusData' value={times.biid}
                                name="biid"
                                onChange={onValueChange}
                            />
                            {/* 수정시 넘길 땐 biid로 넘겨야 하는 거 아닌가요 value는 한개인데 어쩌죠 */}

                            <GetLocData findLocid={paramLocid} className='getLocData' value={times.locid}
                                name="locid"
                                onChange={onValueChange}
                            />
                    </>)}           
                        <hr />
                        <button onClick={handleUpdate} type='button'>수정</button> <br />
                        <button onClick={handleDelete} type='button' className='vDeleteBtn'>삭제</button>
                    
                </div>
        </div>
    </>)

}
