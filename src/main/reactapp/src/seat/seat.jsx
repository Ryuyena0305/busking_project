import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import './seat.css';

import Button from '@mui/joy/Button';

export default function Seat() {
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();
    const { biid } = useParams();
    const  navigate  = useNavigate();

   

    const onUpdate = async (bsnum, bsstate) => {
        const response = await axios.put(`http://localhost:8080/busseat?biid=1&bsnum=${bsnum}`, { biid, bsnum, bsstate });
        if (response.data) onGet(); // 상태 업데이트 후 좌석 정보 새로 가져오기
    }

    // 좌석을 x, y 좌표 기준으로 그룹화
    const groupSeats = () => {
        const rows = [];

        seats.forEach(({ x, y, bsnum, bsstate }) => {
            if (!rows[x]) rows[x] = [];
            rows[x][y] = { bsnum, bsstate };
        });
        return rows;
    };

    const onPage = () => {
        alert('좌석 수정이 완료되었습니다.');
        navigate('./');

        
    };

    const groupedSeats = groupSeats();

    return (
        <>
            <div className="buswrap">
                <h5>좌석 출력</h5>

                <div className="bus">
                    <div className="buswidth">
                        <img className="driverImg" src="../etc/driver.png" alt="driver" />
                        <div>{binum}<br />&nbsp;&nbsp;&nbsp;&nbsp;BUS</div>
                        <img className="driverImg" src="../etc/ent.png" alt="entrance" />
                    </div>

                    <div className="btncontain">

                        {groupedSeats.map((x, y) => (
                            <div key={y} className="seatrow" style={{ display: 'flex', justifyContent: 'space-evenly',marginBottom:'3px' }}>
                                {x && x.map((seat, colIndex) => (
                                    <div className="seatbtn" key={colIndex}>
                                        
                                            {seat.bsstate == 1 ?
                                                <Button className="statebtn" onClick={() => onUpdate(seat.bsnum, 0)} variant="outlined">{seat.bsnum}</Button>
                                                : <Button className="statebtn" onClick={() => onUpdate(seat.bsnum, 1)} variant="soft">X</Button>
                                            }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bus2">
            <Button className="nextPageBtn" onClick={()=>onPage()}>좌석수정</Button>:
            </div>
            </div>
        </>
    );
}
