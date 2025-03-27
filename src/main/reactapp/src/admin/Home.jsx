import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TviewDate from "./timetable/TviewDate";
import "./timetable/timetable.css";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

export default function Home(props) {
    const [notifications, setNotifications] = useState([]); // useState로 상태 관리

    useEffect(() => {
        const adminSocket = new WebSocket("ws://localhost:8080/ws/notify");

        adminSocket.onopen = () => {
            console.log("✅ 관리자 WebSocket 연결됨");
        };

        adminSocket.onmessage = (event) => {
            console.log("📩 WebSocket 메시지 수신:", event.data);
            setNotifications((prev) => [...prev, "🔔 " + event.data]); // 상태 업데이트
        };

        adminSocket.onerror = (error) => {
            console.log("❌ 관리자 WebSocket 오류:", error);
        };

        return () => adminSocket.close(); // 컴포넌트 언마운트 시 WebSocket 닫기
    }, []);


    // 우수 버스기사 조회

    const [bestDrivers, setBestDrivers] = useState([]);

    const onBestDriver = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/home/bestdriver`)
            setBestDrivers(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        onBestDriver();
    }, []);  

    



    return (
        <>
            <div id="container">
                <div className="hContent">
                    <div className="hMainCont">
                        <div className="hTopCont">
                            <h3>우수 버스기사 👑</h3>
                            <div className="driverRank">
                                <div className="box2nd ranker">
                                    <div className="tit2nd">2등</div>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 2)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 2)?.dname || '없음'} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 2)?.timecount || '0'} 건</div>
                                </div>

                                <div className="box1st ranker">
                                    <div className="tit1st">1등</div>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 1)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 1)?.dname || '없음'} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 1)?.timecount || '0'} 건</div>
                                </div>

                                <div className="box3rd ranker">
                                    <div className="tit3rd">3등</div>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 3)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 3)?.dname || '없음'} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 3)?.timecount || '0'} 건</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hBottomCont">
                            
                            <h3>금주 스케줄 건수 📅</h3>
                            <Link to={"/tcreate"} className="hLink">
                                <button type="button" className="hBtn1">
                                    스케줄 등록 <br />바로가기
                                </button>
                            </Link>
                            

                            <BarChart
                                className="barChart"
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        data: ["날짜1", "날짜2", "날짜3", "날짜4", "날짜5", "날짜6", "날짜7"],
                                    },
                                ]}
                                series={[{ data: [4, 3, 10] }]}
                                width={700}
                                height={300}
                            />
                        </div>
                    </div>


                    
                    <div id="notifications">
                        <div className="notiTit">
                            <h3>알림</h3>
                        </div>
                        {notifications.length === 0 ? (
                            <div className="notiCont">알림이 없습니다.</div>
                        ) : (
                            notifications.map((msg, index) => <div className="notiCont" key={index}>{msg}</div>)
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
