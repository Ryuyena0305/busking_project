import TviewDate from "./timetable/TviewDate";
import './timetable/timetable.css';


export default function Home( props ){
    return(<>
        <div id="container">
            <div className="hContent">

                <div className="hBox1">
                    일주일 스케줄 건수 그래프 / 막대에 링크 걸기
                </div>

                <div className="hSubContent">
                    <div className="hBox2">
                        일자별 스케줄 조회 바로가기
                    </div>
                    <div className="hBox3">
                        버스 정보 바로가기
                    </div>
                </div>

                <div className="hBox4">
                    사용자 전환 바로가기
                </div>



            </div>
        </div>
    </>)
}
