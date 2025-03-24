import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Grid, Box } from '@mui/material';

export default function AutoPhone() {
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
    const handleButtonClick = (value) => {
        setEmail(email + value);
    };
    const handleBackspace = () => {
        setEmail(prevEmail => prevEmail.slice(0, -1));
    };

    return (
        <><div >
            <div className="date-header">
                <h2>이메일 입력해주세요</h2>
            </div>

            {/* 이메일 입력 부분 */}
            <TextField
                label="이메일을 입력하세요"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <div className='keypad-container'>
            {/* 키패드 부분 */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: 2,
                    boxShadow: 2,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {/* 숫자와 알파벳 버튼 */}
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((value) => (
                        <Grid item xs={2} key={value}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => handleButtonClick(value)}
                            >
                                {value}
                            </Button>
                        </Grid>
                    ))}
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map((value) => (
                        <Grid item xs={2} key={value}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => handleButtonClick(value)}
                            >
                                {value}
                            </Button>
                        </Grid>
                    ))}

                    {/* 특수문자 버튼 */}
                    {['@', '.'].map((value) => (
                        <Grid item xs={2} key={value}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => handleButtonClick(value)}
                            >
                                {value}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleBackspace}
                    >
                        ⬅️ 지우기
                    </Button>
                </Grid>
            </Grid>
            </Box>
            </div>
            {/* 다음 버튼 */}
            <Button className='emailButton' onClick={onRes} fullWidth>
                다음
            </Button>
            
        </div>
        </>
    );
}
