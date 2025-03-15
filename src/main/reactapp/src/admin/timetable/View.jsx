import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';


export default function Tview(props){
    const [ searchParams ] = useSearchParams();
    const timeid = searchParams.get('timeid');

    const [time, setTime] = useState('');

    useEffect(() => {
        onView();
    }, [timeid]);  

    const onView = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/view?timeid=${timeid}`);
            setTime(response.data);
        }catch(error){
            console.log(error);
        }
    }



    return(<>
        <div id="container">
            {time && (<>
                <h1>스케줄 상세 조회</h1>
                <div className="vContent">
                    <div className='subTit'>출발일자</div>
                    <input type="text" className='subCont'/>

                    <div className='subTit'>출발시간</div>
                    <input type="text" className='subCont' />

                    <div className='subTit'>차량 정보</div>
                    <input type="text" className='subCont' />

                    <div className='subTit'>터미널 정보</div>
                    <input type="text" className='subCont' />

                    <hr />
                    <button type='button'>수정</button> <br />
                    <button type='button'>삭제</button>

                </div>
            </>)}
        </div>
    </>)
}
