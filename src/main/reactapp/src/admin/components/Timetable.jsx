
import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';



// select에서 사용할 차량정보 가져오기
export default function GetBusData( props ){
    const [biid, setBiid] = useState('');
    const [selectBuss, setSelectBuss] = useState([]);

    //console.log(selectBuss);
    //console.log( props )

    // 상세조회시 기본값 설정
    let defaultBiid = "defaultBiid" in props ? props.defaultBiid : '' ;
    //console.log( defaultBiid );

    const getBus = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getbus`)
            //console.log(response.data);
            setSelectBuss(response.data);
        }catch(error) {
            console.log(error);
        }
    } //  end

    useEffect(() => {
        getBus();
    }, []);

    // biid가 변경될 때마다 biid를 GetBusData에 전달
    useEffect(() => {
       if (biid) {
            props.findBiid(biid);
        }
    }, [biid, props.findBiid]);


    const busUpdate = (e) =>{
        setBiid(e.target.value)
        "setTimes" in props && props.setTimes( { ...props.times , "biid"  : e.target.value } )
        // setTimes가 props에 존재하면 뒤 코드 실행해라
    }
    

    return(<>
        <div className='viewFind'>차량 정보</div>
        <select className='subCont' value={ biid == '' ? defaultBiid : biid  } onChange={ busUpdate }>
            <option value="0">선택</option>
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

    //console.log( props );
    
    // 상세조회시 기본값 설정
    let defaultLocid = "defaultLocid" in props ? props.defaultLocid : '' ;
    //console.log( defaultLocid );

    const getLoc = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/timetable/getloc`)
            //console.log(response.data);
            setSelectLocs(response.data);
            console.log(setSelectLocs);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLoc();
    }, [])

    // Locid가 변경될 때마다 locid를 GetBusData에 전달
    useEffect(() => {
        if (locid) {
                props.findLocid(locid);
            }
        }, [locid, props.findLocid]);


    const locUpdate = (e) =>{
        setLocid(e.target.value)
        "setTimes" in props && props.setTimes( { ...props.times , "locid"  : e.target.value } )
    }



    return(<>
        <div className='viewFind'>터미널 정보</div>
            <select className='subCont' value={ locid == '' ? defaultLocid : locid  } onChange={locUpdate}>
                <option value="0">선택</option>
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


// select에서 사용할 버스기사 정보 가져오기
export function GetDriverData(props){
    const [did, setDid] = useState('');
    const [selectDrivers, setselectDrivers] = useState([]);

    console.log( props );
    
    // 상세조회시 기본값 설정
    let defaultDid = "defaultDid" in props ? props.defaultDid : '' ;
    

    const getDriver = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/driver/getdriver`)
            //console.log(response.data);
            setselectDrivers(response.data);
            console.log(setselectDrivers);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDriver();
    }, [])

    // did가 변경될 때마다 did를 GetBusData에 전달
    useEffect(() => {
        if (did) {
                props.findDid(did);
            }
        }, [did, props.findDid]);


    const driverUpdate = (e) =>{
        setDid(e.target.value)
        "setTimes" in props && props.setTimes( { ...props.times , "did"  : e.target.value } )
    }



    return(<>
        <div className='viewFind'>버스기사 정보</div>
            <select className='subCont' value={ did == '' ? defaultDid : did  } onChange={driverUpdate}>
                <option value="0">선택</option>
            {
                selectDrivers.map((selectDriver, index) => {
                    return(
                            <option key={index} value={`${selectDriver.did}`}>{selectDriver.dname}</option>
                    )
                })
            }
            </select>
    </>)
}
