import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './resvseat2.css';

import Button from '@mui/joy/Button';

export default function Seat() {
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();
    const [seatId, setSeatId] = useState([]);
    const [count, setCount] = useState(0);
    const [viewbsnum, setViewbsnum] = useState(0); // viewbsnum을 상태로 관리
    const { biid } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        onGet();
    }, [biid]);

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=1`);
        setSeats(response.data);
        setBinum(response.data[0].binum);
    };

    const onChoice = (bsnum) => {
        setSeatId(prevSeatId => {
            if (prevSeatId.includes(bsnum)) {
                return prevSeatId.filter(id => id != bsnum);
            } else {
                return [...prevSeatId, bsnum];
            }
        });
    };

    const onCount = () => {
        setCount(prevCount => prevCount + 1); // 상태 업데이트 방식으로 변경
    };

    const onPage = (seatId) => {
        alert('{예매정보 지역,시간 좌석 2매 }예매 완료되었습니다.');
        navigate('./');
    };

    // 좌석을 x, y 2차원 배열형태로 변환
    const groupSeats = () => {
        const rows = [];
        let updatedViewbsnum = 0;  // viewbsnum을 여기서 계산하도록 변경

        seats.forEach(({ x, y, bsnum, bsstate }) => {
            if (!rows[x]) rows[x] = [];
            rows[x][y] = { bsnum, bsstate };

            if (rows[x][y].bsstate == 0) {
                onCount(); // 선택된 좌석 수 증가
            }

            // 이 부분에서 viewbsnum을 갱신하지 않고, 한 번에 처리하도록 변경
            updatedViewbsnum = updatedViewbsnum - count;
            rows[x][y].newValue = updatedViewbsnum;
        });
        setViewbsnum(updatedViewbsnum); // 상태는 한 번만 업데이트

        return rows;
    };

    const groupedSeats = groupSeats();  // 여기서 결과를 얻고

    useEffect(() => {
        console.log(seatId);
    }, [seatId]);

    return (
        <div className="buswrap">
            <h5>좌석 출력</h5>
            {/* 좌석 상단 */}
            <div className="bus">
                <div className="buswidth">
                    <img className="driverImg" src="../etc/driver.png" alt="driver" />
                    <div>{binum}<br />&nbsp;&nbsp;&nbsp;&nbsp;BUS</div>
                    <img className="driverImg" src="../etc/ent.png" alt="entrance" />
                </div>
                {/* 좌석 버튼 */}
                <div className="btncontain">
                    {groupedSeats.map((x, y) => {
                        return(
                        <div key={y} className="seatrow" style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '3px' }}>
                            {x && x.map((seat, y) => (
                                
                                <div
                                    className="seatbtn"
                                    key={y}
                                    style={{
                                        visibility: seat.bsstate == 1 ? 'visible' : 'hidden',
                                        backgroundColor: seatId.includes(seat.bsnum) ? '#69a9f973' : '', // 선택된 좌석에 색을 추가
                                        borderRadius:'5px'
                                    }}
                                >
                                    {seat.bsstate == 1 ? (
                                        <Button className="statebtn" onClick={() => onChoice(seat.bsnum)} variant="outlined">{seat.viewbsnum}</Button>
                                    ) : (
                                        <Button className="statebtn"  variant="soft">X</Button>
                                    )}
                                </div>
                            ))}
                        </div>)}
                    )}
                </div>
            </div>
            <div className="bus2">
                <Button className="nextPageBtn" onClick={() => onPage(seatId)}>예약하기</Button>
            </div>
        </div>
    );
}
