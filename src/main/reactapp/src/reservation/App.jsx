// App.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Res from './Res.jsx';
import AutoRes from './AutoRes.jsx';
import admin from '../admin/App.jsx';

import './App.css';



export default function App(props) {
    const location = useLocation();


    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const day = getDate.getDate();
    const hours = getDate.getHours();
    const minutes = getDate.getMinutes();

    const today = `${year}년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
    const time = `${hours < 10 ? '0' + hours : hours}시 ${minutes < 10 ? '0' + minutes : minutes}분`;


    
    return (
        <div className="container">
            <div className="content">
                {location.pathname !== '/Res' && location.pathname !== '/AutoRes' && (
                    <div className='realcontent'>
                        <div className='tit'>[ 버스 승차권 발매기 ]</div>
                        <div className='subTit'>
                            <div className='left'>
                                <Link to = "/">
                                    <FontAwesomeIcon icon={faMapPin} className="admin"/>
                                </Link> {/* 링크 연결 필요 */}
                                <div>&nbsp;&nbsp;인천</div>
                            </div>
                            <div>
                                <Link to = "/">
                                    <FontAwesomeIcon icon={faHouse} className="home"/>
                                </Link> {/* 링크 연결 필요 */}
                            </div>
                            <div className='right'>
                                <div className='date'>{today}</div>
                                <div className='time'>{time}</div>
                            </div>
                        </div>
                        <div className='mainbtn'>
                            <Link to="/Res">
                                <button className='nomal'>일반예매</button>
                            </Link>
                            <Link to="/AutoRes">
                                <button className='auto'>자동예매</button>
                            </Link>
                        </div>
                        <div className='lang'>
                            <button>한국어</button>
                            <button>English</button>
                            <button>中國語</button>
                            <button>日本語</button>
                        </div>
                    </div>
                )}
            </div>

            <Routes>
                <Route path="/Res" element={<Res/>} />
                <Route path="/AutoRes" element={<AutoRes/>} />
            </Routes>
        </div>
    );
}
