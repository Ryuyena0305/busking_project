import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import "./resvseat.css";
import Button from "@mui/joy/Button";

export default function ResvSeat() {
  const [seats, setSeats] = useState([]); 
  const [seatId, setSeatId] = useState([]); 
  const [rprice, setRprice] = useState(0);
  const [total, setTotal] = useState(0); 
  const { biid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { startdate, dest, time, person } = queryString.parse(location.search);

  const onGet = async () => {
    try {
      const seatsResponse = await axios.get(
        `http://localhost:8080/resv/seat?startdate=${startdate}&dest=${encodeURIComponent(dest)}&starttime=${encodeURIComponent(time)}`
      );
  
      const priceResponse = await axios.get(
        `http://localhost:8080/resv/price?startdate=${startdate}&dest=${encodeURIComponent(dest)}&starttime=${encodeURIComponent(time)}`
      );
  
      const seats = seatsResponse.data;
      const rprice  = priceResponse.data;
  
      setSeats(seats); 
      setRprice(rprice); 
      setTotal(rprice * person);
    } catch (error) {
      console.log(error);
    } 
  };
  
  const onChoice = (bsnum) => {
    setSeatId((prevSeatId) => {
      if (prevSeatId.includes(bsnum)) {
        return prevSeatId.filter((id) => id !== bsnum); 
      } else if (prevSeatId.length >= person) {
        return prevSeatId; 
      } else {
        return [...prevSeatId, bsnum];
      }
    });
  };

  const groupSeats = () => {
    const rows = [];
    const cols = 5; 
    const totalSeats = seats.length;

    for (let i = 0; i < 11; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const seatIndex = i * cols + j;
        if (seatIndex < totalSeats) {
          row.push(seats[seatIndex]); 
        } else {
          row.push(null); 
        }
      }
      rows.push(row); 
    }

    return rows;
  };

  const groupedSeats = groupSeats();

  useEffect(() => {
    onGet(); 
  }, [startdate, dest, time]); 

  const onPage = () => {
    alert(`${startdate} ${dest}행 ${time.split(":").slice(0, 2)} ${person}명 선택하였습니다.`);
    navigate("./"); 
  };


  return (
    <div className="buswrap">
      <h5>{dest}행 {startdate} {time} 출발</h5>
      {/* 좌석 상단 */}
      <div className="bus">
        <div className="buswidth">
          <img className="driverImg" src="../etc/driver.png" alt="driver" />
          <div>{dest}<br />&nbsp;&nbsp;&nbsp;&nbsp;BUS</div>
          <img className="driverImg" src="../etc/ent.png" alt="entrance" />
        </div>
        {/* 좌석 버튼 */}
        <div className="btncontain">
          {groupedSeats.map((row, rowIdx) => (
            <div key={rowIdx} className="seatrow" style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '3px' }}>
              {row.map((seat, colIdx) => (
                <div
                  className="seatbtn"
                  key={colIdx}
                  style={{
                    backgroundColor: seatId.includes(seat) ? '#69a9f973' : '', 
                    borderRadius: '5px',
                    visibility: seat ? 'visible' : 'hidden', // 빈 좌석은 숨기기
                  }}
                >
                  {seat ? (
                    <Button
                      className="statebtn"
                      onClick={() => onChoice(seat)}
                      variant="outlined"
                    >
                      {seat}
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bus2">
        <u1>
          <l1>인원수 : {person} ----- {rprice}원</l1> <br/>
          <l1>총 가격 : {total}원 </l1>
          <Button className="nextPageBtn" onClick={onPage}>
            예약하기
          </Button>
        </u1>
      </div>
    </div>
  );
}
