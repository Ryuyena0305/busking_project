import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Resvlog(props) {

    const [logs, setlogs] = useState([])

    const getLog = async () => {
        try{
            const response = await axios.get('http://localhost:8080/resvlog')
            console.log(response);
            setlogs(response.data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=> {
        getLog();
    })


    return(<>
        <div id="container">
            <h1>예매로그</h1>
            <div className='pickContent'>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>출발일자</th>
                            <th>출발시간</th>
                            <th>터미널</th>
                            <th>좌석번호</th>
                            <th>금액</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                logs.map( (log, index)=> (
                                        <tr  className='bodyTr' key={index}>
                                            <td>{log.resvid}</td>
                                            <td>{log.startdate}</td>
                                            <td>{log.starttime}</td>
                                            <td>{log.dest}</td>
                                            <td>{log.bsnum}</td>
                                            <td>{log.total}</td>
                                            <td>{log.email}</td>
                                        </tr>
                                ))
                            }

                    </tbody>
                </table>

            </div>
        </div>
    </>)
}