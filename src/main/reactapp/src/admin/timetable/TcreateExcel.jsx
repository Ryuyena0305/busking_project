import * as React from 'react';
import axios from 'axios';
import './timetable.css';

import { useState } from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';

import GetBusData, { GetLocData } from '../components/Timetable';
import { useNavigate } from 'react-router-dom';



export default function TcreateExcel(props) {
    return (<>

        <div id="container">
            <h1> Excel로 스케줄 등록 </h1>

            <div className='vContent'>
                <h1> 엑셀 파일 업로드 (예시 형식 준수)</h1>
                <p style={{ fontsize: "12px", color: "gray", marginBottom: "3px" }}>※ .xls 또는 .xlsx 파일만 업로드 가능합니다.</p>
                <table style={{ width: "650px", margin: "0px auto", marginBottom: "50px" }}>
                    <thead>
                        <tr>
                            <th>출발일자</th>
                            <th>출발시간</th>
                            <th>차량 정보</th>
                            <th>터미널 정보</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>2025-01-01</td>
                            <td>12:00:00</td>
                            <td>12사1234</td>
                            <td>아산</td>

                        </tr>
                        <tr >
                            <td>2025-01-01</td>
                            <td>12:30:00</td>
                            <td>23아2345</td>
                            <td>동서울</td>

                        </tr>
                        <tr>
                            <td>ㆍㆍㆍ</td>
                            <td>ㆍㆍㆍ</td>
                            <td>ㆍㆍㆍ</td>
                            <td>ㆍㆍㆍ</td>
                        </tr>


                    </tbody>
                </table>
                <input
                    style={{ marginBottom: "10px", border: "none", outline: "none" }}
                    type="file"
                    accept=".xls,.xlsx"
                /><br />


                <hr />
                <button type='button' className='createBtn'>등록</button>
            </div>
        </div>

    </>)

}