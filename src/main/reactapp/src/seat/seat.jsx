import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './seat.css';

import Button from '@mui/joy/Button';

export default function seat(props) {
    const [seats, setSeats] = useState([]);
    const [binum, setBinum] = useState();



    const navigate = useNavigate();
    const { biid } = useParams();

    useEffect(() => {
        onGet();
    }, [biid]);

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=1`);
        console.log(response.data);
        console.log(response.data.binum);

        setSeats(response.data);
        setBinum(response.data[0].binum);
    }

    const onPut = async (bsnum, bsstate) => {
        const response = await axios.put(`http://localhost:8080/busseat?biid=1&bsnum=${bsnum}`, { biid: 1, bsnum: bsnum, bsstate: bsstate });
        if (response.data == true) { onGet(); }

    }

    


    return (
        <>
            <div className="buswrap">
                <h5>좌석 출력</h5>


                <div className="bus">
                    <div className="buswidth">
                        <img className="driverImg" src="../etc/driver.png"></img>
                        <div>{binum}<br/>&nbsp;&nbsp;&nbsp;&nbsp;BUS </div>

                        <img className="driverImg" src="../etc/ent.png"></img>
                    </div>
                    <div className="btncontain">
                    {
                        
                        seats.map((seat, index) => {
                            
                            console.log(seats[index].x)
                            console.log(seats[index].y)
                            
                            return (

                                <div className="seatbtn" key={index}>
                                    {seat.bsstate == 1 ? (
                                        <Button className="statebtn" onClick={() => { onPut(seat.bsnum, 0) }} variant="outlined">{seat.bsnum}</Button>
                                    ) : (
                                        <Button className="statebtn" onClick={() => { onPut(seat.bsnum, 1) }} variant="soft">X</Button>
                                    )}
                                </div>
                            )

                        }


                        )
                        
                    }
                    </div>
                </div>
            </div>
        </>
    );
}
