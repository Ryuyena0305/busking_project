import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import StartDate from './StartDate.jsx';   
import AutoRes from './AutoRes.jsx';
import Dest from './Dest.jsx'
import Main from './Main.jsx';
import Time from "./Time.jsx";
import Person from "./Person.jsx";
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
                </div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/AutoRes" element={<AutoRes />} />
                <Route path="/StartDate/*" element={<StartDate />} />
                <Route path="/dest" element={<Dest />} />
                <Route path="/time" element={<Time />} /> 
                <Route path="/person" element={<Person />} />  
            </Routes>
        </div>
    );
}
