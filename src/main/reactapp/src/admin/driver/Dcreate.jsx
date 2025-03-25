import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import GetBusData, { GetLocData } from '../components/Timetable';


export default function Dcreate(props){
    const [driverInfo, setDriverInfo] = useState({dname : '', ddate : '', dphone : ''})



    return(<>
        <div id='container'>
            <h1>버스기사 등록</h1>
            <div className='vContent'>
                <div className='subTit'>이름</div>
                <input type="text" className='subCont'/>

                <div className='subTit'>생년월일</div>
                <input type="text" className='subCont'/>

                <div className='subTit'>연락처</div>
                <input type="text" className='subCont'/>

                <div className='subTit'>프로필</div>
                <input type="file" className='subCont'/>

                <hr/>
                
                <button type='button' className='createBtn'>등록</button>

            </div>
        </div>
    </>)

}