import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';

import GetBusData, { GetLocData } from '../components/Timetable';
import { useNavigate } from 'react-router-dom';

export default function TcreateExcel(props) {
    const [file, setFile] = useState(null);  // 파일 상태 관리
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
    const [uploadMessage, setUploadMessage] = useState("");  // 업로드 상태 메시지
    const navigate = useNavigate();  // 라우팅을 위한 hook

    // 파일 선택 처리
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // 파일 업로드 처리
    const handleFileUpload = async () => {
        if (!file) {
            setUploadMessage("파일을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsLoading(true);
            setUploadMessage("업로드 중...");

            // 서버로 파일 업로드
            const response = await axios.post('http://localhost:8080/excel/read', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsLoading(false);
            setUploadMessage("업로드 완료!");

            // 업로드 성공 후 처리, 예를 들어 성공 메시지 후 페이지 이동
            // navigate('/somewhere');  // 다른 페이지로 이동 예시

        } catch (error) {
            setIsLoading(false);
            setUploadMessage("업로드 실패. 다시 시도해주세요.");
            console.error("파일 업로드 오류", error);
        }
    };

    return (
        <>
            <div id="container">
                <h1> Excel 스케줄 등록 </h1>

                <div className='vContent'>
                    <h1> Excel 파일 업로드 (예시 형식 준수)</h1>
                    <p style={{ fontSize: "12px", color: "gray", marginBottom: "3px" }}>
                        ※ .xls 또는 .xlsx 파일만 업로드 가능합니다.
                    </p>
                    <div className='excelTableBox'>
                        <table style={{margin: "0px auto"}}>
                            <thead>
                                <tr>
                                    <th>출발일자</th>
                                    <th>출발시간</th>
                                    <th>차량 정보</th>
                                    <th>터미널 정보</th>
                                    <th>버스기사 이름</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2025-01-01</td>
                                    <td>12:00:00</td>
                                    <td>12사1234</td>
                                    <td>아산</td>
                                    <td>홍길동</td>
                                </tr>
                                <tr>
                                    <td>2025-01-01</td>
                                    <td>12:30:00</td>
                                    <td>23아2345</td>
                                    <td>동서울</td>
                                    <td>홍길순</td>
                                </tr>
                                <tr>
                                    <td>ㆍㆍㆍ</td>
                                    <td>ㆍㆍㆍ</td>
                                    <td>ㆍㆍㆍ</td>
                                    <td>ㆍㆍㆍ</td>
                                    <td>ㆍㆍㆍ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input
                        style={{ marginBottom: "10px", border: "none", outline: "none" }}
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={handleFileChange}  // 파일 선택 시 처리
                    /><br />

                    <hr />
                    <button 
                        type='button' 
                        className='adCreateBtn' 
                        onClick={handleFileUpload}  // 업로드 버튼 클릭 시 처리
                    >
                        등록
                    </button>

                    {isLoading && <p>업로드 진행 중...</p>}
                    {uploadMessage && <p>{uploadMessage}</p>} {/* 업로드 상태 메시지 */}
                </div>
            </div>
        </>
    );
}
