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

      console.log(seats);

      const 예매석 = []
      for (let i = 0; i < seats.length; i++) {
        예매석.push(seats[i].bsid - (biid - 1) * 55)
      }

      console.log(예매석);

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
  }, [startdate, dest, starttime, biid]);

  const onPage = () => {
    if (seatId.length !== Number(person)) {
      alert('인원에 맞게 선택해주세요.');
      return;
    }
    alert(`${startdate} ${dest}행 ${starttime.split(":").slice(0, 2)} ${person}명 선택하였습니다.`);
    navigate(`/phone?startdate=${startdate}&dest=${encodeURIComponent(dest)}&time=${starttime}&seats=${seatId.join(',')}`);
  };
  const formattedTotal = new Intl.NumberFormat().format(total);
  const formattedRprice = new Intl.NumberFormat().format(rprice);

  return (<div>
    <div className="date-header">
      <h2>{startdate} &nbsp;&nbsp;|&nbsp;&nbsp; {starttime.split(":").slice(0, 2).join(":")} &nbsp;&nbsp;|&nbsp;&nbsp;{dest}</h2>
    </div>
    <div className="buswrap">


      {/* 좌석 상단 */}
      <div className="busflex">
        <div className="resvbus">
          <div className="buswidth">
            <img className="driverImg" src="../etc/driver.png" alt="driver" />
            <div>{dest}</div>
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
                    {seat.bsstate != 1 || seats2.includes(seat.bsnum) ? (
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

        </div>
        <div>
          <div className="bus bus2 bus3">
            <u1>
              <l1>인원수 X {person} ········ {formattedRprice}원</l1> <br /><br />
              <li>&nbsp;&nbsp;&nbsp;</li>
              <hr></hr>
              <l1 className="totalPrice">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                총 가격 : {formattedTotal}원 </l1>

            </u1>
          </div>
          <div>
            <Button className="nextPageBtn" onClick={onPage}>
              다음
            </Button>
          </div>
          <div className="bus bus2 bus3">
            <div className="seatinfo">
              <div className="info1">
                <div className="infoimg1">

                </div>
                <div className="infoname">선택가능<br/>&nbsp;&nbsp;&nbsp;좌석</div>
                </div>
              <div className="info1">
                <div className="infoimg2">

                </div>
                <div className="infoname">판매된<br/>&nbsp;&nbsp;좌석</div>
                </div>
              <div className="info1">
                <div className="infoimg3">
                  
                </div>
                <div className="infoname">선택한<br/>&nbsp;&nbsp;좌석</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}