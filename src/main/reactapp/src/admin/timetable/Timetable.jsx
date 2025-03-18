
import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';

// import axios from 'axios';



// // select에서 사용할 차량정보 가져오기
// export default async function getBus( 매개변수 , 매개변수2 )  {
//     try{
//         //const response = await axios.get(`http://localhost:8080/timetable/getbus`)
//         const response = await axios.get( 매개변수2 )
//         console.log(response.data);
//         //setSelectBuss(response.data);
//         매개변수(response.data);
//     }catch(error) {
//         console.log(error);
//     }
// } // getData end


export default function GetBusData(props){
    const [biid, setBiid] = useState('');
    const [selectBuss, setSelectBuss] = useState([]);

    const getBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getbus`)
            console.log(response.data);
            setSelectBuss(response.data);
        }catch(error) {
            console.log(error);
        }
    } //  end

    useEffect(() => {
        getBus();
    }, [])
    return(<>
        <div className='subTit'>차량 정보</div>
        <select className='subCont' value={biid} onChange={(e) => setBiid(e.target.value)}>
            <option>선택</option>
        {
            selectBuss.map((selectBus, index) => {
                return(
                        <option key={index} value={`${selectBus.biid}`}>{selectBus.binum}</option>
                )
            })
        }
        </select>
    </>)
}