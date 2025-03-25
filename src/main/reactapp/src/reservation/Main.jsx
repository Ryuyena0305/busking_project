import { Link } from "react-router-dom";

export default function Main(){

    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth() + 1;
    const day = getDate.getDate();
    const hours = getDate.getHours();
    const minutes = getDate.getMinutes();

    const today = `${year}년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
    const time = `${hours < 10 ? '0' + hours : hours}시 ${minutes < 10 ? '0' + minutes : minutes}분`;
    
    return(<>             
    <div className="content">
        {location.pathname !== '/StartDate' && location.pathname !== '/AutoRes' && (
            <div className='realcontent'>
                <div className='mainbtn'>
                    <Link to="/StartDate">
                        <button className='nomal'>일반예매</button>
                    </Link>
                    <Link to="/autostartdate">
                        <button className='auto'>자동예매</button>
                    </Link>
                </div>
                <div className='lang'>
                    <button>한국어</button>
                    <button>English</button>
                    <button>中國語</button>
                    <button>日本語</button>
                </div>
                
            </div>
        )}
    </div></>)
}