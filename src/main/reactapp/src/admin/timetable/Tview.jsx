import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';


export default function Tview(props){

    const [ searchParams ] = useSearchParams();
    const timeid = searchParams.get('timeid');

    const navigate = useNavigate(); 
    const [times, setTimes] = useState('');
    const [starttime, setStarttime] = useState('');
    const [startdate, setStartdate] = useState('');
    const [biid, setBiid] = useState('');
    const [locid, setLocid] = useState('');

    useEffect(() => {
        onView();
    }, [timeid]);  


    const onView = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view?timeid=${timeid}`);
            setTimes(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const timeTableDto = {
            timeid : timeid,
            starttime : starttime,
            startdate : startdate,
            biid : biid,
            locid : locid
        };
        try {
                const response = await axios.put(`http://localhost:8080/timetable/view?timeid=${timeid}`, timeTableDto); 
                if (response.data == true) {
                    alert('스케줄 수정 성공');
                    setStarttime('');
                    setStartdate('');
                    setBiid('');
                    setLocid('');
                    navigate("/");
                }else{
                    alert('스케줄 수정 실패')
                }
            }catch(error) {
                console.log(error);
            }

    };

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

                    <div className='subTit'>출발일자</div>
                    <input type="text" className='subCont'  value={startdate} onChange={(e) => setStartdate(e.target.value)}/>

                    <div className='subTit'>출발시간</div>
                    <input type="text" className='subCont'  value={starttime} onChange={(e) => setStarttime(e.target.value)}/>

                    <div className='subTit'>차량 정보</div>
                    <input type="text" className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)} />

                    <div className='subTit'>터미널 정보</div>
                    <input type="text" className='subCont' value={locid} onChange={(e) => setLocid(e.target.value)} />

                    <hr />
                    <button onClick={handleUpdate} type='button'>수정</button> <br />
                    <button onClick={handleDelete} type='button' className='vDeleteBtn'>삭제</button>

                </div>
        </div>
    </>)

}
