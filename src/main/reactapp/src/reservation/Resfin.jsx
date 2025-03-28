import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Resfin(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000); 

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <>
        <div className='resfin'>
            <h1>🚩🚍 예매 완료! 🚍🎫</h1>
            <h3>3초 후 홈화면으로 이동 합니다</h3>
        </div>
        </>
    );
}
