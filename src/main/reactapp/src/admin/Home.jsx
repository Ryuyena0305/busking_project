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
        onChartData();
    }, []);  

    // 우수 버스기사 로그 파일 다운로드
    const downloadRankLog = async () => {
        try {
                const response = await axios.get("http://localhost:8080/home/download/ranklog", {
                    responseType: "blob"
                });
                console.log(response);
        
                
                const text = await response.data.text();

                if (text === "랭킹 자료가 존재하지 않습니다.") {
                    alert("랭킹 자료가 존재하지 않습니다.");
                    return;
                }
            
                const blob = new Blob([text], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "driver-rank-log.csv";
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                alert("다운로드 중 오류가 발생했습니다.");
                console.error(error);
            }
    };



    // 최근 7일 스케줄 건수 차트
    const [chartData, setChartData] = useState([])

    const onChartData = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/home/datechart`)
            setChartData(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

      // m월 d일
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        return `${month}월 ${day}일`;
    }

    const dates = chartData.map(item => formatDate(item.date))
    const counts = chartData.map(item => item.count)
    



    return (
        <>
            <div id="container">
                <div className="hContent">
                    <div className="hMainCont">
                        <div className="hTopCont">
                            <div className="hTopContFlex">
                                <h2>지난달 우수 버스기사 👑</h2>
                                <button onClick={downloadRankLog}>CSV 다운로드</button>
                            </div>
                            
                            <div className="driverRank">
                                <div className="box2nd ranker">
                                    <h3 className="tit2nd">🥈</h3>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 2)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 2)?.dname || ''} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 2)?.timecount || '0'} 건</div>
                                </div>

                                <div className="box1st ranker">
                                    <h2 className="tit1st">🥇</h2>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 1)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 1)?.dname || ''} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 1)?.timecount || '0'} 건</div>
                                </div>

                                <div className="box3rd ranker">
                                    <h3 className="tit3rd">🥉</h3>
                                    <img src={"http://localhost:8080/upload/" + 
                                        (bestDrivers.find(driver => driver.rankno === 3)?.dprofile || "default.jpg")
                                    }/>
                                    <div>{bestDrivers.find(driver => driver.rankno === 3)?.dname || ''} 기사</div>
                                    <div>{bestDrivers.find(driver => driver.rankno === 3)?.timecount || '0'} 건</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hBottomCont">
                            <div className="hbCount">(건)</div>
                            <div className="timeTit">
                                <h2>최근 7일 스케줄 현황 📅</h2>
                                <Link to={"/tcreate"} className="hLink">
                                    <button type="button" className="hBtn">
                                        스케줄 등록 <br />바로가기
                                    </button>
                                </Link>
                            </div>
                            

                            <BarChart className="barChart"
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        data: dates,
                                    },
                                ]}
                                series={[{ data: counts }]}
                                width={1000}
                                height={380}
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
