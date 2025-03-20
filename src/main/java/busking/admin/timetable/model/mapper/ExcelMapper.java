package busking.admin.timetable.model.mapper;

import busking.admin.timetable.model.dto.ExcelDto;
import busking.admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ExcelMapper {

    @Select("select time.timeid, time.startdate, time.starttime, info.binum, info.driver, loc.dest, info.biid, loc.locid\n" +
            "from timetable time\n" +
            "join businfo info on time.biid = info.biid\n" +
            "join location loc on time.locid = loc.locid\n" +
            "where startdate = #{startdate}")
    List<ExcelDto> findAll(String startdate);



}
