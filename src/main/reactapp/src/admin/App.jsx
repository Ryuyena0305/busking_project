import { BrowserRouter , Route , Routes } from 'react-router-dom'; // 'npm i react-router-dom' 설치 필요
/* 라우터로 연결할 컴포넌트 import 가져온다. */
import Home from './Home.jsx'
import Create from './Create.jsx';
import Read from './Read.jsx';
import Update from './Update.jsx';
import Delete from './Delete.jsx';
import SideBar from './SideBar.jsx';
import AppBar2 from './AppBar2.jsx';

/* timetable 스케줄 관리 */
import Tcreate from './timetable/Create.jsx';
import Tdelete from './timetable/Delete.jsx';
import Tupdate from './timetable/Update.jsx';
import Tview from './timetable/View.jsx';
import TviewBus from './timetable/ViewBus.jsx';
import TviewDate from './timetable/ViewDate.jsx';
import TviewLoc from './timetable/ViewLoc.jsx';
/* css impot */
import './app.css'; // ./ : 현재 파일과 같은 경로 뜻


// App.jsx : 라우터(가상URL)이용한 라이팅
export default function App( props ){ // 컴포넌트 
    return (<>
        <BrowserRouter> { /* 모든 라우터를 감싼다. */}
            <div id ="wrap">
                <AppBar2 />
                <SideBar />
                <Routes> { /* 가상 으로 정의한 URL를 감싼다. */}
                    <Route path="/" element={ <Home /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/create" element={ <Create /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/read" element={ <Read /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/update" element={ <Update /> } /> {/* 각 가상의 URL 정의한다. 컴포넌트 연결 */}
                    <Route path="/delete" element={ <Delete /> } />

                    {/* timetable 스케줄 관리 */}
                    <Route path="/tcreate" elememt={<Tcreate/>} />
                    <Route path="/tdelete" elememt={<Tdelete/>} />
                    <Route path="/tupdate" elememt={<Tupdate/>} />
                    <Route path="/tview" elememt={<Tview/>} />
                    <Route path="/tview/bus" elememt={<TviewBus/>} />
                    <Route path="/tview/date" elememt={<TviewDate/>} />
                    <Route path="/tview/loc" elememt={<TviewLoc/>} />
                </Routes>
            </div>
        </BrowserRouter>
    </>)
}