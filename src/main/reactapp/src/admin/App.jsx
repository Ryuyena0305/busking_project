import { BrowserRouter , Route , Routes } from 'react-router-dom'; // 'npm i react-router-dom' 설치 필요
/* 라우터로 연결할 컴포넌트 import 가져온다. */
import Home from './Home.jsx'
import Create from './Create.jsx';
import Read from './Read.jsx';
import Update from './Update.jsx';
import BusView from './BusView.jsx'
import TypeRead from './TypeRead.jsx'
//import Delete from './Delete.jsx';
import SideBar from './SideBar.jsx';
import AppBar2 from './AppBar2.jsx';
import BusInfoSeat from './BusInfoSeat.jsx';

/* timetable 스케줄 관리 */
import Tcreate from './timetable/Tcreate.jsx';
import Tview from './timetable/Tview.jsx';
import TviewBus from './timetable/TviewBus.jsx';
import TviewDate from './timetable/TviewDate.jsx';
import TviewLoc from './timetable/TviewLoc.jsx';
import TviewExcel from './timetable/TcreateExcel.jsx';

/* resvlog 예매 로그 */
import Resvlog from './resvlog/Resvlog.jsx';

/* css impot */
import './app.css'; // ./ : 현재 파일과 같은 경로 뜻


import { useEffect, useState } from 'react';
import Login from './Login.jsx';
import axios from 'axios';



// App.jsx : 라우터(가상URL)이용한 라이팅
export default function App( props ){ // 컴포넌트 

    const [ login , setLogin ] = useState(false);

    useEffect( ()=>{ onLogin() } , [])

    const onLogin = async () =>{ 
        const response = await axios.get("http://localhost:8080/busking/admin/info", {withCredentials: true})
        if(response.data == true){setLogin(true);}
        else{setLogin(false);}
        console.log( response.data );
    }

    console.log( login );
    

    return (<>
        <BrowserRouter> { /* 모든 라우터를 감싼다. */}
            
            
            <div id ="wrap">
            { login == true ? ( <><AppBar2 /> <SideBar /></>) :  (<><div> <Login/> </div></>)  }
                <Routes> { /* 가상 으로 정의한 URL를 감싼다. */}
                    <Route path="/home" element={ <Home /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/create" element={ <Create /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/read" element={ <Read /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/update" element={ <Update /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/bus/view" element={<BusView />} /> 
                    <Route path="/typeread" element={<TypeRead />} />
                    <Route path="/businfoseat" element={<BusInfoSeat/>}/>
                    
                    {/* timetable 스케줄 관리 */}
                    <Route path="/tcreate" element={<Tcreate/>} />
                    <Route path="/tview" element={<Tview/>} />
                    <Route path="/tview/bus" element={<TviewBus/>} />
                    <Route path="/tview/date" element={<TviewDate/>} />
                    <Route path="/tview/loc" element={<TviewLoc/>} />
                    <Route path="/tcreateexcel" element={<TviewExcel/>} />

                    {/* resvlog 예매로그 */}
                    <Route path="/resvlog" element={<Resvlog/>} />
                </Routes>
            </div>
   
        </BrowserRouter>
    </>)
}