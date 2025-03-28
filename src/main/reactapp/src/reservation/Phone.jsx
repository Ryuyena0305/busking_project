import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Grid, Box, CircularProgress, Backdrop } from '@mui/material';

export default function Phone() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const startdate = params.get('startdate');
    const dest = params.get('dest');
    const starttime = params.get('time');
    const bsnum = params.get('seats').split(',');

    const onRes = async () => {
        const data = { phone: email, startdate, dest, starttime, bsnum };
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/resv', data, {
                headers: { 'Content-Type': 'application/json' }
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonClick = (value) => {
        setEmail(email + value);
    };

    const handleBackspace = () => {
        setEmail(prevEmail => prevEmail.slice(0, -1));
    };

    return (
        <div>
            <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: 9999 }}>
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '8px',
                    color: '#fff', textAlign: 'center'
                }}>
                    <CircularProgress style={{ color: '#fff' }} />
                    <p>예매 진행 중...</p>
                </div>
            </Backdrop>

            <div className="date-header">
                <h2>이메일 입력해주세요</h2>
            </div>

            <TextField
                label="이메일을 입력하세요"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ fontSize: '2rem', padding: '15px', '& input': { fontSize: '2rem' } }}
            />

            <div className='keypad-container'>
                <Box sx={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    backgroundColor: 'white', padding: 2, boxShadow: 2
                }}>
                    <Grid container spacing={1} justifyContent="center">
                        {[...'1234567890abcdefghijklmnopqrstuvwxyz@.'].map((value) => (
                            <Grid item xs={2} key={value}>
                                <Button variant="outlined" fullWidth sx={{ fontSize: '1.5rem', padding: '15px' }}
                                    onClick={() => handleButtonClick(value)}>
                                    {value}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth sx={{ fontSize: '1.8rem', padding: '15px' }}
                                onClick={handleBackspace}>
                                ⬅️ 지우기
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth sx={{ fontSize: '1.8rem', padding: '15px' }}
                                onClick={onRes} disabled={isLoading}>
                                {isLoading ? "예매 중..." : "다음➡️"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
