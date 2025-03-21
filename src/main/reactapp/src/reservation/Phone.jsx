import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Phone() {
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const startdate = params.get('startdate'); 
    const dest = params.get('dest');  
    const starttime = params.get('time');  
    const bsnum = params.get('seats').split(','); 

    const onRes = async () => {
        const data = {
            phone: email,  
            startdate: startdate, 
            dest: dest,  
            starttime: starttime, 
            bsnum: bsnum  
        };

        try {
            const response = await axios.post('http://localhost:8080/resv', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = response.data;
            if (result > 0) {
                alert('예매 성공');
                navigate(`/resfin`);
            } else {
                alert('예매 실패');
            }
        } catch (error) {
            console.log(error);
            alert('예매 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
        <div className="date-header">
            <h2>이메일 입력해주세요</h2>
            </div>
            <input 
                className='email'
                type="email" 
                placeholder="이메일을 입력하세요"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button className='emailButton' onClick={onRes}>다음</button>
        </>
    );
}
