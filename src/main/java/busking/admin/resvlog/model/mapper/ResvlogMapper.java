package busking.admin.resvlog.model.mapper;


import busking.user.model.dto.ResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ResvlogMapper {
    /*  << 조인 항목 >>
        (예매)resv
        예매아이디
        resvid

        (예매)resv
        전화번호
        phone

        (예매)resv
        총금액
        totalprice = 한명의 가격 * 인원수
        <사용x> resv(rprice) 한명의 가격 / 목적지 + 좌석 = 좌석금액
                // rprice = bustype(btprice) + location(locprice)

        (터미널)location
        도착지
        dest

        (스케줄)timetable
        출발일자
        startdate

        (스케줄)timetable
        출발시간
        starttime

        (좌석)busseat
        좌석번호
        bsnum
    */

    // 예매내역 전체 조회
    @Select("select * from resv")
    public List<ResDto> findAll();
}