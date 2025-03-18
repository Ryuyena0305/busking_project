import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './timetable/timetable.css';
import './app.css';
export default function Login() {
    // 입력받은 값들을 저장하는 state 변수 선언
    const [loginInfo, setLoginInfo] = useState({ adpwd: "" });

    // 입력값 변경 시 state 업데이트
    const onInputChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };

    const navigate = useNavigate();
    const onLogin = async () => {
        try {
            
            const requestData = {
                adpwd: loginInfo.adpwd
            };
            const response = await axios.post("http://localhost:8080/busking/admin/login", requestData, {withCredentials: true});
            const result = response.data;
            if (result) { 
                alert('로그인 성공');
                // navigate('/home');
                location.href = '/' 
            } else {
                alert('로그인 실패: 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생", error);
            alert("로그인 중 문제가 발생했습니다.");
        }
    };

    return (
        <div id="container"> 
            <form className='vContent createBox'>
            <h1> 로그인 페이지 </h1>
            <div className='subTit'>비밀번호</div> <input type="password" className='subCont' name="adpwd" value={loginInfo.adpwd} onChange={onInputChange} /> 
                <br/>
                <button type="button" onClick={onLogin} className='createBtn'> 로그인 </button>
            </form>
        </div>
    );
}
