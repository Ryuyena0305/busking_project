import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import './resvseat.css';

import Button from '@mui/joy/Button';

export default function ResvSeat() {
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();
    const [seatId, setSeatId] = useState([]);
    const { biid } = useParams();
    const  navigate  = useNavigate();
  
    
    
    useEffect(() => {
        onGet();
    }, [biid]);

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=${biid}`);
        setSeats(response.data);
        setBinum(response.data[0].binum);
    };

    const onChoice = (bsnum) => {
        setSeatId(prevSeatId => {
            // 좌석 번호가 이미 선택된 상태인지 확인
            if (prevSeatId.includes(bsnum)) {
                // 이미 선택된 좌석이라면 제거
                return prevSeatId.filter(id => id != bsnum);
            } else {
                // 선택되지 않은 좌석이라면 추가
                return [...prevSeatId, bsnum];
            }
        });
    };
    const onPage = (seatId) => {
        alert('{예매정보 지역,시간 좌석 2매 }예매 완료되었습니다.');
        navigate('./');
        
    };

    // 좌석을 x, y 2차원 배열형태로 변환
    const groupSeats = () => {
        const rows = [];
        let count = 0;
        let viewbsnum=0;
        
        seats.forEach(({ x, y, bsnum, bsstate }) => {
            viewbsnum++
            if (!rows[x]) rows[x] = []; // 행변경 
            rows[x][y] = {viewbsnum,bsnum, bsstate }; // 좌석상태 

            if( rows[x][y].bsstate == 0  ){
                count++;
                
            }else{
                rows[x][y].viewbsnum = rows[x][y].viewbsnum-count;
                console.log(viewbsnum)
            }

        });
        return rows;
    };

    const groupedSeats = groupSeats();

    useEffect(() => {
        console.log(seatId);
    }, [seatId]);

    return (
        <div className="buswrap">
            <h5></h5>
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
                                        <Button className="statebtn" onClick={() => onChoice(seat.bsnum)} variant="outlined">{seat.viewbsnum}</Button>
                                    ) : (
                                        <Button className="statebtn" onClick={() => onChoice(seat.bsnum)} variant="soft">X</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bus2">
            <Button className="nextPageBtn" onClick={()=>onPage(seatId)}>예약하기</Button>
            </div>
        </div>
    );
}
