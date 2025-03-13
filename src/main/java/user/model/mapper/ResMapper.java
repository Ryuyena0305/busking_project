package user.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ResMapper {
    @Select("SELECT DISTINCT startdate FROM timetable WHERE startdate")
    List<String> getStart();

    @Select("SELECT DISTINCT l.dest FROM timetable t JOIN location l ON t.locid = l.locid JOIN resv r ON t.timeid = r.timeid WHERE t.startdate = #{startdate}")
    List<String> getLocation(@Param("startdate") String startdate);

    @Select("SELECT DISTINCT t.starttime FROM timetable t JOIN location l ON t.locid = l.locid WHERE t.startdate = #{startdate} AND l.dest = #{dest}")
    List<String> getStartTime(@Param("startdate") String startdate, @Param("dest") String dest);

    @Select("SELECT DISTINCT b.bsnum FROM busseat b JOIN timetable t ON b.btid = t.biid JOIN location l ON t.locid = l.locid WHERE t.startdate = #{startdate} AND l.dest = #{dest} AND t.starttime = #{starttime}")
    List<String> getSeat(@Param("startdate") String startdate, @Param("dest") String dest, @Param("starttime") String starttime);



}