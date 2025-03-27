package busking.admin.timetable.model.mapper;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.io.IOException;
import java.util.List;

@Mapper
public interface ExcelMapper {

    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid " +
            "from timetable time " +
            "join businfo info on time.biid = info.biid " +
            "join location loc on time.locid = loc.locid " +
            "join driver d on time.did = d.did " +
            "where startdate = CURDATE() ")
    List<ExcelDto> justDown();

    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid " +
            "from timetable time " +
            "join businfo info on time.biid = info.biid " +
            "join location loc on time.locid = loc.locid " +
            "join driver d on time.did = d.did " +
            "where startdate = #{startdate}" +
            "ORDER BY loc.dest ASC, time.starttime ASC")
    public List<ExcelDto> View(String startdate);


    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid " +
            "from timetable time " +
            "join businfo info on time.biid = info.biid " +
            "join location loc on time.locid = loc.locid " +
            "join driver d on time.did = d.did " +
            "where startdate = #{startdate}" +
            "ORDER BY loc.dest ASC, time.starttime ASC")
    public void generatedateExcel( ) throws IOException;



}
