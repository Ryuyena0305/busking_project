


import axios from 'axios';

// select에서 사용할 차량정보 가져오기
export default async function getBus( 매개변수 , 매개변수2 )  {
    try{
        //const response = await axios.get(`http://localhost:8080/timetable/getbus`)
        const response = await axios.get( 매개변수2 )
        console.log(response.data);
        //setSelectBuss(response.data);
        매개변수(response.data);
    }catch(error) {
        console.log(error);
    }
} // getData end