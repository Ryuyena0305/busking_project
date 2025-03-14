import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './seat.css';

import Button from '@mui/joy/Button';

export default function Seat() {
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();
    const [seatId, setSeatId] = useState([]);

    const { biid } = useParams();

    useEffect(() => {
        onGet();
    }, [biid]);

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=1`);
        setSeats(response.data);
        setBinum(response.data[0].binum);
    };

    const onUpdate = (bsnum) => {
        setSeatId(prevSeatId => {
            // 좌석 번호가 이미 선택된 상태인지 확인
            if (prevSeatId.includes(bsnum)) {
                // 이미 선택된 좌석이라면 제거
                return prevSeatId.filter(id => id !== bsnum);
            } else {
                // 선택되지 않은 좌석이라면 추가
                return [...prevSeatId, bsnum];
            }
        });
    };

    // 좌석을 x, y 좌표 기준으로 그룹화
    const groupSeats = () => {
        const rows = [];
        seats.forEach(({ x, y, bsnum, bsstate }) => {
            if (!rows[x]) rows[x] = [];
            rows[x][y] = { bsnum, bsstate };
        });
        return rows;
    };

    const groupedSeats = groupSeats();

    // Log seatId whenever it changes
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
                    {groupedSeats.map((x, y) => (
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
                                        <Button className="statebtn" onClick={() => onUpdate(seat.bsnum)} variant="outlined">{seat.bsnum}</Button>
                                    ) : (
                                        <Button className="statebtn" onClick={() => onUpdate(seat.bsnum)} variant="soft">X</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
