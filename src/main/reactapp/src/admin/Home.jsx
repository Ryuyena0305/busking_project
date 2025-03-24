import { Link } from "react-router-dom";
import TviewDate from "./timetable/TviewDate";
import './timetable/timetable.css';

import { BarChart } from '@mui/x-charts/BarChart';


export default function Home( props ){
    return(<>
        <div id="container">
            <div className="hContent">
                <div className="hSubContent">
                    <div className="hscFlex">
                        <h3>일자별 스케줄 건수</h3>
                        <Link to={'/tcreate'} className="hLink">
                            <button type="button" className="hBtn1">
                                스케줄 등록 <br />바로가기
                            </button>
                        </Link>
                    </div>

                    <BarChart className="barChart"
                        xAxis={[{ scaleType: 'band', data: ['날짜1', '날짜2', '날짜3', '날짜4', '날짜5', '날짜6', '날짜7'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={700}
                        height={250}
                    />
                </div>

                <div className="hSubContent">
                    <div className="hscFlex">
                        <h3>버스 등급별 스케줄 건수</h3>
                        <Link to={'/tcreate'} className="hLink">
                            <button type="button" className="hBtn2">
                                스케줄 등록 <br />바로가기
                            </button>
                        </Link>
                    </div>

                        <BarChart
                            className="barChart"
                            xAxis={[{ scaleType: "band", data: ["일반", "우등", "프리미엄"] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={700}
                            height={300}
                        />
                    </div>

                    {/* 관리자 알림 시스템 */}
                    <h2>관리자 알림 시스템</h2>
                    <p className="status-text">{status}</p>
                    <div id="notifications">
                        {notifications.length > 0 ? (
                            notifications.map((msg, index) => (
                                <p key={index} className="notification">{msg}</p>
                            ))
                        ) : (
                            <p className="notification">알림이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
