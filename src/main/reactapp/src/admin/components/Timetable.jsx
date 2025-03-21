
import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useState } from 'react';
import { useEffect } from 'react';
//import Pagination from 'react-js-pagination';
//import StockItemForm from './StockItemForm';
//import { Link } from 'react-router-dom';


// select에서 사용할 차량정보 가져오기
// props로 한번에 받음(Tview.jsx 부모-> TimeTable.jsx 자식)
    // findBiid={paramBiid} className='getBusData' value={times.biid} defaultBiid={ times.biid }
    //  name="biid"
    //  times={times}
    //  setTimes={setTimes}
// 부모에 있는 변수들을 자식에서 쓸 수 있음
export default function GetBusData( props ){
    const [biid, setBiid] = useState('');
    const [selectBuss, setSelectBuss] = useState([]);

    //console.log(selectBuss);
    
    console.log( props )

    
    let defaultBiid = "defaultBiid" in props ? props.defaultBiid : '' ;
    console.log( defaultBiid );

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


    const 수정함수 = (e) =>{
        setBiid(e.target.value)
        "setTimes" in props && props.setTimes( { ...props.times , "biid"  : e.target.value } )
        // setTimes가 props에 존재하면 뒤 코드 실행해라
    }
    

    return(<>
        <div className='viewFind'>차량 정보</div>
        <select className='subCont' value={ biid == '' ? defaultBiid : biid  } onChange={ 수정함수  }>
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

    const findLocid = props.findLocid;
    console.log( props );
    
    let defaultLocid = "defaultLocid" in props ? props.defaultLocid : '' ;
    console.log( defaultLocid );

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
                findLocid(locid);
            }
        }, [locid, findLocid]);

    const 수정함수2 = (e) =>{
        setLocid(e.target.value)
        "setTimes" in props && props.setTimes( { ...props.times , "locid"  : e.target.value } )
    }



    return(<>
        <div className='viewFind'>터미널 정보</div>
            <select className='subCont' value={ locid == '' ? defaultLocid : locid  } onChange={수정함수2}>
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




// // 테이블
// export function MyTable(props){
//     return(<>
//         <table>
//             <thead>
//                 <tr>
//                     <th>번호</th><th>출발일자</th><th>출발시간</th><th>차량정보</th><th>운전기사</th><th>도착지</th><th>비고</th>
//                 </tr>
//             </thead>
//             <tbody> 
//                 {
//                     getViewLists.map((getViewList, index) => (
//                         <tr className='bodyTr' key={index}>
//                             <td>{getViewList.timeid}</td>
//                             <td>{getViewList.startdate}</td>
//                             <td>{getViewList.starttime}</td>
//                             <td>{getViewList.binum}</td>
//                             <td>{getViewList.driver}</td>
//                             <td>{getViewList.dest}</td>
//                             <td><Link to={`/tview?timeid=${getViewList.timeid}`} className='link'><button type='button'>상세조회</button></Link></td>
//                         </tr>
//                     ))
//                 }
//             </tbody>
//         </table>
//     </>)
// }









// // 페이지네이션
// export function Page(props){
    
//     const [stockList, setStockList ] = useState([])

//     const [page, setPage] = useState(1);

//     const itemsPerPage = 10;

//     const changePageHandler = (page) => {
//         setPage(page);
//     }

//     const [currentList, setCurrentList] = useState(stockList);

//     const indexOfLastItem = page * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//     useEffect(() => {
//         setCurrentList(stockList.slice(indexOfFirstItem, indexOfLastItem));

//     },[page, stockList]);




//     return(<>

//         {/* {currentList.map((item) => {
//             <div>
//                 <StockItemForm item={item} />
//             </div>
//         })} */}
//         {/* 페이지네이션 컴포넌트 */}
//         <Pagination
//             activePage={page} //현재 페이지
//             itemsCountPerPage={itemsPerPage} // 한 페이지 당 보여줄 아이템 갯수
//             totalitensCount={stockList.length} // 총 아이템 갯수
//             pageRangeDisplayed={5}// paginator에 나타낼 페이지 범위
//             prevPageText={"<"} // 이전을 나타낼 텍스트
//             nextPageText={">"} // "다음"을 나타낼 텍스트
//             onChange={changePageHandler} // 페이지 변경을 핸들링하는 함수
//         />
//     </>)
    
// }