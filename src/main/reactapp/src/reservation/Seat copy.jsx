import ResvSeat from "../seat/ResvSeat"
import queryString from 'query-string';
export default function Seat(props) {
    const { startdate, dest } = queryString.parse(location.search);
    return(<>
    <h1>인원수 선택</h1>
    <ResvSeat></ResvSeat>
    </>)
}