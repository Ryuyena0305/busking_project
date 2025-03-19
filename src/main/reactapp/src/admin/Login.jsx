import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    // 입력받은 값들을 저장하는 state 변수 선언
    const [loginInfo, setLoginInfo] = useState({ adpwd: "" });
    const [capsLockOn, setCapsLockOn] = useState(false); // Caps Lock 감지 상태
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

    const navigate = useNavigate();

    // 입력값 변경 시 state 업데이트
    const onInputChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };

    // Caps Lock 감지 함수
    const checkCapsLock = (event) => {
        if (event.getModifierState("CapsLock")) {
            setCapsLockOn(true);
        } else {
            setCapsLockOn(false);
        }
    };

    // Enter 키 입력 시 로그인 함수 실행
    const handleKeyDown = (event) => {
        checkCapsLock(event); // Caps Lock 감지
        if (event.key === "Enter") {
            event.preventDefault(); // 폼 자동 제출 방지
            onLogin();
        }
    };

    // 로그인 처리 함수
    const onLogin = async () => {
        try {
            const requestData = { adpwd: loginInfo.adpwd };
            const response = await axios.post(
                "http://localhost:8080/busking/admin/login",
                requestData,
                { withCredentials: true }
            );
            const result = response.data;
            if (result) {
                alert("로그인 성공");
                location.href = '/';
            } else {
                alert("로그인 실패: 비밀번호를 확인하세요.");
            }
        } catch (error) {
            console.error("로그인 요청 중 오류 발생", error);
            alert("로그인 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="content2">
            <form className="loginBox" onSubmit={(e) => e.preventDefault()}>
                <h2 className="title"> Admin </h2>
                <div className="pwd">비밀번호</div>
                <input
                    type={showPassword ? "text" : "password"}
                    className="pwdBox"
                    name="adpwd"
                    value={loginInfo.adpwd}
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown} // Enter 키 입력 시 로그인 실행
                />
                {capsLockOn && <div className="caps-warning">⚠ Caps Lock이 켜져 있습니다.</div>}
                
                {/* 비밀번호 표시 기능 */}
                <div className="show-password">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">비밀번호 표시</label>
                </div>

                <button type="button" onClick={onLogin} className="loginBtn">
                    로그인
                </button>
            </form>
        </div>
    );
}
