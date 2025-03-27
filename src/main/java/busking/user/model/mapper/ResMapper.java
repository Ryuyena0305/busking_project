package busking.user.model.mapper;

import org.apache.ibatis.annotations.*;
import busking.user.model.dto.ResDto;

import java.util.List;
import java.util.Map;

@Mapper
public interface ResMapper {
    @Select("SELECT DISTINCT startdate FROM timetable WHERE startdate")
    List<String> getStart();

    @Select("SELECT DISTINCT l.dest FROM timetable t " +
            "JOIN location l ON t.locid = l.locid " +
            "Left JOIN resv r ON t.timeid = r.timeid " +
            "WHERE t.startdate = #{startdate}")
    List<String> getLocation(@Param("startdate") String startdate);

    @Select("SELECT DISTINCT t.starttime, t.timeid FROM timetable t " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE t.startdate = #{startdate} " +
            "AND l.dest = #{dest}")
    List<Map<Object, Object>> getStartTime(@Param("startdate") String startdate, @Param("dest") String dest);

    @Select("SELECT * \n" +
            "FROM resvdetail AS rd\n" +
            "INNER JOIN resv AS r ON rd.resvid = r.resvid\n" +
            "WHERE r.timeid = #{timeid}\n" +
            "AND rd.bsid IS NOT NULL;")
    List<Map<String, Object>> getResvDetail(int timeid);

    @Select("SELECT rd.bsid \n" +
            "FROM resvdetail AS rd\n" +
            "INNER JOIN resv AS r ON rd.resvid = r.resvid\n" +
            "WHERE r.timeid = #{timeid}\n" +
            "AND rd.bsid IS NOT NULL;")
    List<Integer> getResvDetail2(int timeid);

    @Select("SELECT bs.bsnum FROM busseat bs JOIN businfo bi ON bs.biid = bi.biid WHERE bs.biid =(select biid from timetable where timeid = #{timeid}) and bsstate = 0;")
    public List<Integer> onGet(int timeid);

//    @Select("SELECT DISTINCT b.bsnum " +
//            "FROM busseat b " +
//            "JOIN timetable t ON b.biid = t.biid " +
//            "JOIN location l ON t.locid = l.locid " +
//            "LEFT JOIN resvdetail rd ON b.bsid = rd.bsid " +
//            "LEFT JOIN resv r ON rd.resvid = r.resvid " +  // resv 테이블과 조인하여 timeid 필터링
//            "WHERE t.startdate = #{startdate} " +
//            "AND l.dest = #{dest} " +
//            "AND t.starttime = #{starttime} " +
//            "AND (r.timeid = #{timeid} OR r.timeid IS NULL) " +  // 예약된 `timeid`만 필터링 (또는 예약되지 않은 좌석)
//            "AND rd.bsid IS NULL")  // 예약되지 않은 좌석만
//    List<String> getSeat(@Param("startdate") String startdate,
//                         @Param("dest") String dest,
//                         @Param("starttime") String starttime,
//                         @Param("timeid") int timeid);


    @Insert("INSERT INTO resv (email, rprice, total , timeid) VALUES (#{phone}, #{rprice}, #{total}, #{timeid})")
    @Options(useGeneratedKeys = true, keyProperty = "resvid")
        // resDto 객체의 resvid 필드로 생성된 키를 자동 매핑
    int Res(ResDto resDto);

    // 6. 예약 상세 정보 삽입 (bsid, resvid -> insert into resvdetail)
    @Insert("INSERT INTO resvdetail (bsid, resvid) " +
            "SELECT bs.bsid, #{resvid} " +
            "FROM busseat bs " +
            "JOIN timetable t ON bs.biid = t.biid " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE bs.bsnum = #{bsnum} " +  // 예약하려는 bsnum에 해당하는 좌석 찾기
            "AND l.dest = #{dest} " +  // 동적으로 받은 목적지(dest)로 필터링
            "AND t.startdate = #{startdate} " +  // 동적으로 받은 예약 날짜
            "AND t.starttime = #{starttime} " +  // 동적으로 받은 출발 시간
            "AND bs.biid = (SELECT t2.biid FROM timetable t2 " +
            "               JOIN location l2 ON t2.locid = l2.locid " +
            "               WHERE l2.dest = #{dest} " +  // 동적으로 받은 목적지(dest)
            "               AND t2.startdate = #{startdate} " +
            "               AND t2.starttime = #{starttime} LIMIT 1)" // 동적으로 biid 찾기
    )
    int ResDetail(@Param("bsnum") int bsnum,
                  @Param("resvid") int resvid,
                  @Param("startdate") String startdate,
                  @Param("starttime") String starttime,
                  @Param("dest") String dest);

    @Select("SELECT timeid FROM timetable t " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE t.startdate = #{startdate} " +
            "AND t.starttime = #{starttime} " +
            "AND l.dest = #{dest}")
    int getTimeId(@Param("starttime") String starttime, @Param("startdate") String startdate, @Param("dest") String dest);

    @Select("SELECT locid FROM location WHERE dest = #{dest}")
    int getLocId(@Param("dest") String dest);

    @Select("SELECT bt.btprice FROM timetable t " +
            "JOIN businfo b ON t.biid = b.biid " +
            "JOIN bustype bt ON b.btid = bt.btid " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE t.startdate = #{startdate} " +
            "AND t.starttime = #{starttime} " +
            "AND l.dest = #{dest}")
    int getBtprice(@Param("startdate") String startdate,
                   @Param("dest") String dest,
                   @Param("starttime") String starttime);

    @Select("SELECT locprice FROM location WHERE dest = #{dest}")
    int getLocprice(@Param("dest") String dest);

    @Select("SELECT " +
            "    t.biid, " +
            "    t.startdate, " +
            "    l.dest, " +
            "    t.starttime " +
            "FROM " +
            "    timetable t " +
            "JOIN " +
            "    location l ON t.locid = l.locid " +
            "WHERE " +
            "    t.timeid = #{timeid}")
    ResDto getTimeInfo(int timeid);

    @Update("update resv set state = 1 where resvid = #{resvid}")
    public boolean getState(int resvid);

    @Select("SELECT b.bsnum\n" +
            "FROM busseat b\n" +
            "JOIN timetable t ON b.biid = t.biid\n" +
            "JOIN location l ON t.locid = l.locid\n" +
            "LEFT JOIN resvdetail rd ON b.bsid = rd.bsid\n" +
            "LEFT JOIN resv r ON rd.resvid = r.resvid\n" +
            "WHERE t.startdate = #{startdate}\n" +
            "AND l.dest = #{dest}\n" +
            "AND t.starttime = #{starttime}\n" +
            "AND (r.timeid = #{timeid} OR r.timeid IS NULL) \n" +
            "AND rd.bsid IS NULL\n" +
            "AND b.bsstate = 1")
    List<Integer> getAvailableSeats(@Param("startdate") String startdate,
                                    @Param("starttime") String starttime,
                                    @Param("dest") String dest,
                                    @Param("timeid") int timeid);
}
