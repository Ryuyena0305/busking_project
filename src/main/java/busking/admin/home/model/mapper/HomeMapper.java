package busking.admin.home.model.mapper;

import busking.admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface HomeMapper {

    // 지난달 우수 버스기사 조회
    @Select("SELECT dname, timecount, rankno, dprofile \n" +
            "FROM ( \n" +
            "       SELECT \n" +
            "        d.dname, \n" +
            "        d.dprofile, \n" +
            "        COUNT(t.timeid) AS timecount,\n" +
            "        ROW_NUMBER() OVER (ORDER BY COUNT(t.timeid) DESC) AS rankno\n" +
            "       FROM timetable t\n" +
            "       JOIN driver d ON t.did = d.did\n" +
            "       WHERE DATE_FORMAT(t.startdate, '%Y-%m') = DATE_FORMAT(CURRENT_DATE - INTERVAL 1 MONTH, '%Y-%m')\n" +
            "       GROUP BY d.dname, d.dprofile \n" +
            ") AS bestdrivers \n" +
            "WHERE rankno <= 3")
    public List<TimeTableDto> getBestDriver();

    // 테스트용
//    @Select("SELECT dname, timecount, rankno, dprofile \n" +
//            "FROM ( \n" +
//            "       SELECT \n" +
//            "        d.dname, \n" +
//            "        d.dprofile, \n" +
//            "        COUNT(t.timeid) AS timecount,\n" +
//            "        ROW_NUMBER() OVER (ORDER BY COUNT(t.timeid) DESC) AS rankno\n" +
//            "       FROM timetable t\n" +
//            "       JOIN driver d ON t.did = d.did\n" +
//            "       WHERE t.startdate >= NOW() - INTERVAL 5 SECOND\n" +
//        "       GROUP BY d.dname, d.dprofile \n" +
//                ") AS bestdrivers \n" +
//                "WHERE rankno <= 3")
//    public List<TimeTableDto> getBestDriver();



    // 차트 일자별 스케줄 건수 가져오기
    @Select("SELECT startdate AS date, COUNT(*) AS count \n" +
            "FROM timetable \n" +
            "WHERE startdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND CURDATE() \n" +
            "GROUP BY startdate \n" +
            "ORDER BY startdate")
    public List<TimeTableDto> getDateChart();
}
