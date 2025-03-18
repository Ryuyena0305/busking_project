
import * as React from 'react';
import axios from 'axios';
import './timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';

// select에서 사용할 차량정보 가져오기
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


// select에서 사용할 터미널 정보 가져오기
export function GetLocData(props){
    const [locid, setLocid] = useState('');
    const [selectLocs, setSelectLocs] = useState([]);

    const getLoc = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getloc`)
            console.log(response.data);
            setSelectLocs(response.data);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLoc();
    }, [])

    return(<>
        <div className='subTit'>터미널 정보</div>
            <select className='subCont' value={locid} onChange={(e) => setLocid(e.target.value)}>
                <option>선택</option>
            {
                selectLocs.map((selectLoc, index) => {
                    return(
                            <option key={index} value={`${selectLoc.locid}`}>{selectLoc.dest}</option>
                    )
                })
            }
            </select>
    </>)
}
