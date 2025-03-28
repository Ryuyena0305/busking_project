import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './BusInfoSeat.css';
import Button from '@mui/joy/Button';

export default function BusInfoSeat() {
    const [searchParams] = useSearchParams();
    const biid = searchParams.get('biid');
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();
    const [isSeat, setIsSeat] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        onGet();
    }, [biid]);

    const onCreate = async () => {
        const response = await axios.post(`http://localhost:8080/busseat?biid=${biid}`);
        if (response.data == 55) {
            alert('좌석이 생성되었습니다.')
            onGet();  
            
        }
    };

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=${biid}`);
        setSeats(response.data);
        setBinum(response.data[0]?.binum);
        setIsSeat(response.data.length > 0);
       
    };

    const onUpdate = async (bsnum, bsstate) => {
        const response = await axios.put(`http://localhost:8080/busseat?biid=${biid}&bsnum=${bsnum}`, { biid, bsnum, bsstate });
        if (response.data) onGet(); 
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

    const onPage = () => {
        alert('좌석 수정이 완료되었습니다.');
        navigate('/read');
    };

    const groupedSeats = groupSeats();

    return (
        <>
            <div className="buswrap">
                <div className="bus">
                    <div className="buswidth">
                        <img className="driverImg" src="../etc/driver.png" alt="driver" />
                        <div>{binum}<br />&nbsp;&nbsp;&nbsp;&nbsp;BUS</div>
                        <img className="driverImg" src="../etc/ent.png" alt="entrance" />
                    </div>

                    <div className="btncontain">
                        {groupedSeats.map((x, y) => (
                            <div key={y} className="seatrow" style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '3px' }}>
                                {x && x.map((seat, colIndex) => (
                                    <div className="seatbtn" key={colIndex}>
                                        {seat.bsstate === 1 ?
                                            <Button className="statebtn" onClick={() => onUpdate(seat.bsnum, 0)} variant="outlined">{seat.bsnum}</Button>
                                            : <Button className="statebtn" onClick={() => onUpdate(seat.bsnum, 1)} variant="soft">X</Button>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="createBtn">
                    {isSeat ?
                        (<><Button className="nextPageBtn" onClick={() => onPage()}>좌석수정</Button></>) :
                        (<><Button className="createBtn" onClick={() => onCreate()}>좌석생성</Button></>)
                    }
                </div>
            </div>
        </>
    );
}
