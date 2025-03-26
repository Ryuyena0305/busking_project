import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from "react";
import StartDate from './StartDate.jsx';
import AutoStrartDate from './AutoStartDate.jsx';
import Dest from './Dest.jsx';
import Main from './Main.jsx';
import Time from "./Time.jsx";
import Person from "./Person.jsx";
import ResvSeat from "./resvseat.jsx";
import Phone from "./Phone.jsx";
import Resfin from "./Resfin.jsx";
import './App.css';
import './Res.css';

export default function App(props) {
    const location = useLocation();

    // 현재 날짜 및 시간 설정
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const day = getDate.getDate();
    const hours = getDate.getHours();
    const minutes = getDate.getMinutes();

    const today = `${year}년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
    const time = `${hours < 10 ? '0' + hours : hours}시 ${minutes < 10 ? '0' + minutes : minutes}분`;

    // WebSocket 상태 관리
    const [socket, setSocket] = useState(null);
    const [status, setStatus] = useState("연결 중...");

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/ws/notify");

        ws.onopen = () => {
            console.log("WebSocket 연결됨");
            setStatus("서버 연결됨 ✅");
        };

        ws.onerror = (error) => {
            console.log("WebSocket 오류:", error);
            setStatus("연결 오류 ❌");
        };

        setSocket(ws);

        return () => ws.close();
    }, []);

    // 관리자 호출 알림 전송
    const sendNotification = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("사용자가 호출하였습니다!");
            console.log("알림 전송됨!");
        } else {
            console.log("WebSocket이 아직 연결되지 않았습니다.");
        }
    };

    return (
        <div className="container">
            <div className='tit'>[ 버스 승차권 발매기 ]</div>
            <div className='subTit'>
                <div className='left'>
                    <Link to="/">
                        <FontAwesomeIcon icon={faMapPin} className="admin" />
                    </Link>
                    <div>&nbsp;&nbsp;인천</div>
                </div>
                <div>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHouse} className="home" />
                    </Link>
                </div>
                <div className='right'>
                    <div className='date'>{today}</div>
                    <div className='time'>{time}</div>
                </div>
                <button onClick={sendNotification} className="notify-btn">
                    관리자 호출
                </button>
                
            </div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/StartDate/*" element={<StartDate />} />
                <Route path="/dest" element={<Dest />} />
                <Route path="/time" element={<Time />} />
                <Route path="/person" element={<Person />} />
                <Route path="/resvSeat" element={<ResvSeat />} />
                <Route path="/phone" element={<Phone />} />
                <Route path="/resfin" element={<Resfin />} />
                <Route path="/autostartdate" element={<AutoStrartDate />} />
            </Routes>
        </div>
    );
}
