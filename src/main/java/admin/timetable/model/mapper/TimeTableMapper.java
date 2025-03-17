package admin.timetable.model.mapper;

import admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public interface TimeTableMapper {

    // 스케줄 등록
    @Insert("insert into timetable (starttime,startdate,biid,locid) values(#{starttime},#{startdate},#{biid},#{locid})")
    public boolean create(TimeTableDto timeTableDto);

    // 스케줄 상세 조회(겸용)
    @Select("select * from timetable where timeid = #{timeid}")
    public TimeTableDto view(String timeid);

    // 스케줄 수정
    @Update("update timetable set starttime = #{starttime}, startdate = #{startdate}, biid = #{biid}, locid = #{locid} where timeid = #{timeid}")
    public boolean update(TimeTableDto timeTableDto);

    // 스케줄 삭제
    @Delete("delete from timetable where timeid = #{timeid}")
    public boolean delete(String timeid);

    // (도착지별)스케줄 조회
    @Select("select * from timetable time join businfo info on time.biid = info.biid join location loc on time.locid = loc.locid where loc.locid = #{locid}")
    public List<TimeTableDto> locView(int locid);

    // (버스별)스케줄 조회
    @Select("select * from timetable time join businfo info on time.biid = info.biid join location loc on time.locid = loc.locid where info.biid = #{biid}")
    public List<TimeTableDto> busView(int biid);

    // (일자별)스케줄 조회
    @Select("select * from timetable time join businfo info on time.biid = info.biid join location loc on time.locid = loc.locid where startdate = #{startdate}")
    public List<TimeTableDto> dateView(String startdate);

}
