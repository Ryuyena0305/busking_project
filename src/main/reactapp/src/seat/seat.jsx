import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './seat.css';

import Button from '@mui/joy/Button';

export default function seat(props) {
    const [seats, setSeats] = useState([]);

   
    
    const navigate = useNavigate();
    const { biid } = useParams();

    useEffect(() => {
        onGet();
    }, [biid]); 

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=1`);
        console.log(response.data);
        setSeats(response.data);
    }

    const onPut = async (bsnum, bsstate) => {
        const response = await axios.put(`http://localhost:8080/busseat?biid=1&bsnum=${bsnum}`, {biid:1,bsnum:bsnum,bsstate:bsstate});
       if(response.data==true){onGet();}
     
    }
    

    return (
        <>
            <div>
                <h5>좌석 출력</h5>
                <div className="bus">
                    {
                        seats.map((seat, index) => {
                            return (
                                <div key={index}>
                                   
                                    {seat.bsstate == 1 ? (
                                        <Button className="statebtn" onClick={() => { onPut(seat.bsnum, 0) }} variant="outlined">{seat.bsnum}</Button>
                                    ) : (
                                        <Button className="statebtn" onClick={() => { onPut(seat.bsnum, 1) }} variant="soft">X</Button>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}
