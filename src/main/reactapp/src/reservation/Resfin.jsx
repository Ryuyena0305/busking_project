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
            <h1> 예매 완료</h1>
        </>
    );
}
