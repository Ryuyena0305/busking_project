import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import "./resvseat.css";
import Button from "@mui/joy/Button";

export default function ResvSeat() {
  const [seats, setSeats] = useState([]);  // 버스 좌석 상태 
  const [seats2, setSeats2] = useState([]);  // 버스 좌석 예매 상태 
  const [seatId, setSeatId] = useState([]);
  const [rprice, setRprice] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { timeid, person } = queryString.parse(location.search);

  const [startdate, setStartdate] = useState('');
  const [dest, setDest] = useState('');
  const [starttime, setStarttime] = useState('');
  const [time, setTime] = useState('');
  const [biid, setBiid] = useState(0);

  const onGet = async () => {
    try {
      //1. timeid에 해당하는 biid / startdate / dest / starttime 가져오기
      const timeresponse = await axios.get(`http://localhost:8080/resv/timeinfo?timeid=${timeid}`);

      console.log(timeresponse.data);

      setBiid(timeresponse.data.biid);
      const biid = timeresponse.data.biid;

      setStartdate(timeresponse.data.startdate);
      const startdate = timeresponse.data.startdate;

      setDest(timeresponse.data.dest);
      const dest = timeresponse.data.dest;

      setStarttime(timeresponse.data.starttime);
      const starttime = timeresponse.data.starttime;

      const response = await axios.get(`http://localhost:8080/busseat?biid=${biid}`);
      setSeats(response.data);

      const seatsResponse = await axios.get(
        `http://localhost:8080/resv/seat?timeid=${timeid}` 
    );

    const priceResponse = await axios.get(
        `http://localhost:8080/resv/price?startdate=${startdate}&dest=${encodeURIComponent(dest)}&starttime=${encodeURIComponent(starttime)}&timeid=${timeid}` 
    );

      const seats = seatsResponse.data;
      const rprice = priceResponse.data;

      console.log( seats );

      const 예매석 = []
      for( let i = 0 ; i<seats.length ; i++ ){
        예매석.push(seats[i].bsid -(biid==2? 55 : 0))
      }

      console.log( 예매석 );

      setSeats2(예매석);


      console.log(seats)
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

  // 좌석을 x, y 2차원 배열형태로 변환
  const groupSeats = () => {
    const rows = [];
    let count = 0;
    let viewbsnum = 0;

    seats.forEach(({ x, y, bsnum, bsstate }) => {
      viewbsnum++
      if (!rows[x]) rows[x] = []; // 행변경 
      rows[x][y] = { viewbsnum, bsnum, bsstate }; // 좌석상태 

      if (rows[x][y].bsstate == 0) {
        count++;

      } else {
        rows[x][y].viewbsnum = rows[x][y].viewbsnum - count;
        //console.log(viewbsnum)
      }

    });
    return rows;
  };
  const groupedSeats = groupSeats();

  useEffect(() => {
    console.log(seatId);
  }, [seatId]);

  useEffect(() => {
    onGet();
  }, [startdate, dest, time, biid]);

  const onPage = () => {
    alert(`${startdate} ${dest}행 ${time.split(":").slice(0, 2)} ${person}명 선택하였습니다.`);
    navigate(`/phone?startdate=${startdate}&dest=${encodeURIComponent(dest)}&time=${starttime}&seats=${seatId.join(',')}`);
  };

  return (
    <div className="buswrap">
      <h5>{dest}행 {startdate} {starttime} 출발</h5>
      {/* 좌석 상단 */}
      <div className="bus">
        <div className="buswidth">
          <img className="driverImg" src="../etc/driver.png" alt="driver" />
          <div>{dest}<br />&nbsp;&nbsp;&nbsp;&nbsp;BUS</div>
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
                    borderRadius: '5px'
                  }}
                >
                  {seat.bsstate != 1 || seats2.includes( seat.bsnum )  ? (
                    <Button className="statebtn" onClick={() => onChoice(seat.bsnum)} variant="soft" readonly disabled>X</Button>
                  ) : (
                    <Button className="statebtn" onClick={() => onChoice(seat.bsnum)} variant="outlined">
                      {seat.viewbsnum}
                    </Button>
                  )}

                </div>
              ))}
            </div>
          ))}
        </div>


        <div className="bus2">
          <u1>
            <l1>인원수 : {person} ----- {rprice}원</l1> <br />
            <l1>총 가격 : {total}원 </l1>
            <Button className="nextPageBtn" onClick={onPage}>
              예약하기
            </Button>
          </u1>
        </div>

      </div>
    </div>
  );
}
