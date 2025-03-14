package user.model.mapper;

import org.apache.ibatis.annotations.*;
import user.model.dto.ResDto;

import java.util.List;

@Mapper
public interface ResMapper {
    @Select("SELECT DISTINCT startdate FROM timetable WHERE startdate")
    List<String> getStart();

    @Select("SELECT DISTINCT l.dest FROM timetable t " +
            "JOIN location l ON t.locid = l.locid " +
            "JOIN resv r ON t.timeid = r.timeid " +
            "WHERE t.startdate = #{startdate}")
    List<String> getLocation(@Param("startdate") String startdate);

    @Select("SELECT DISTINCT t.starttime FROM timetable t " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE t.startdate = #{startdate} " +
            "AND l.dest = #{dest}")
    List<String> getStartTime(@Param("startdate") String startdate, @Param("dest") String dest);

    @Select("SELECT DISTINCT b.bsnum FROM busseat b " +
            "JOIN timetable t ON b.btid = t.biid " +
            "JOIN location l ON t.locid = l.locid " +
            "WHERE t.startdate = #{startdate} " +
            "AND l.dest = #{dest} " +
            "AND t.starttime = #{starttime}")
    List<String> getSeat(@Param("startdate") String startdate, @Param("dest") String dest, @Param("starttime") String starttime);

    @Insert("INSERT INTO resv (phone, rprice, timeid) VALUES (#{phone}, #{rprice}, #{timeid})")
    @Options(useGeneratedKeys = true, keyProperty = "resvid")  // resDto 객체의 resvid 필드로 생성된 키를 자동 매핑
    int Res(ResDto resDto);

    // 6. 예약 상세 정보 삽입 (bsid, resvid -> insert into resvdetail)
    @Insert("INSERT INTO resvdetail (bsid, resvid) VALUES (#{bsid}, #{resvid})")
    int ResDetail(@Param("bsid") int bsid, @Param("resvid") int resvid);

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

}
