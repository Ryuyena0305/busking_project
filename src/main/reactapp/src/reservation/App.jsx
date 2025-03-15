// App.jsx
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Res from './Res.jsx';
import AutoRes from './AutoRes.jsx';
import './App.css';



export default function App(props) {
    const location = useLocation();

    return (
        <div className="container">
            <div className="content">
                {location.pathname !== '/Res' && location.pathname !== '/AutoRes' && (
                    <div className='realcontent'>
                        <h1>버스 예매</h1>
                        <div className='mainbtn'>
                        <Link to="/Res">
                            <button className='nomal'>일반예매</button>
                        </Link>
                        <Link to="/AutoRes">
                            <button className='auto'>자동예매</button>
                        </Link>
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
