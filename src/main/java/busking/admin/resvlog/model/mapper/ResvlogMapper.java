package busking.admin.resvlog.model.mapper;


import busking.user.model.dto.ResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ResvlogMapper {
    /*  << 조인 항목 >>
        (예매)
        예매아이디
        resv(resvid)

        (예매)
        전화번호
        resv(phone)

        (버스타입)
        총금액
        resv(rprice)
        // bustype(btprice) + location(locprice)

        (터미널)
        도착지
        location(dest)

        (스케줄)
        출발일자
        timetable(startdate)

        (스케줄)
        출발시간
        timetable(starttime)

        (좌석)
        좌석번호
        busseat(bsnum)
    */

    // 예매내역 전체 조회
    @Select("select * from resv")
    public List<ResDto> findAll();
}