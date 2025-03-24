import * as React from 'react';
import axios from 'axios';
import '../timetable/timetable.css';
import { useSearchParams } from 'react-router-dom';


export default function Dview(props){

    const [ searchParams ] = useSearchParams();
    const did = searchParams.get('did');

    



    return(<>
        <div id='container'>

        </div>
    </>)
}