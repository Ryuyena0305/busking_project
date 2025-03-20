import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Resvlog(props) {

    const [logs, setlogs] = useState({
        resvid : '',
        email : '',
        total : '',
        startdate : '',
        starttime : '',
        dest : ''
    })

    const getLog = async () => {
        try{

        }catch(error){}
    }



    return(<>
        <div id="container">
            <h1>예매로그</h1>
            <div></div>
        </div>
    </>)
}