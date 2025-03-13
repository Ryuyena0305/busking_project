import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './seat.css';

import Button from '@mui/joy/Button';
export default function seat(props) {


    const [seats, setSeats] = useState([]);
    const [states, setStates] = useState({bsstate:''});
    const onValueChange = (e) =>{
        setStates({...states,[e.target.name]:e.target.value});
    }

    const { biid } = useParams();
    useEffect(() => {
        onGet();
    }, [])

    const onGet = async () => {
        const response = await axios.get(`http://localhost:8080/busseat?biid=1`);
        console.log(response.data);
        setSeats(response.data);


        
    }

    const onPut = async (bsnum) =>{
        const response = await axios.put(`http://localhost:8080/busseat?biid=1&bsnum=${bsnum}`,states);
    
      }
     

 

    return (<>
        <div>

            <h5>좌석 출력</h5>
            <div className="bus">
                {
    
                    seats.map((seat, index) => {
                        return (
                            
                
                            <div key={index}>
                            {seat.bsstate == 1 ? (
                                <Button className="statebtn" onClick={onPut(seat.bsnum)} onChange={onValueChange} value={seat.bsstate==1?seats.bsstate=0:seats.bsstate=1} variant="outlined">{seat.bsnum}</Button>
                            ) : (
                                
                                <Button  className="statebtn" onClick={onPut(seat.bsnum)} onChange={onValueChange} value={seat.bsstate==0?seats.bsstate=1:seats.bsstate=0} variant="soft">X</Button>
                            )}
                        </div>
                        )
                    })
                }

            </div>

        </div>




    </>)
}

// function 상세페이지(){
//     const {biid} = useParams();
//<Link to ="seat/?biid=1"></Link>
//     return(<></>)
// }


