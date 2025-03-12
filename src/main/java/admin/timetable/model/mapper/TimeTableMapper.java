package admin.timetable.model.mapper;

import admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;

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
    // (버스별)스케줄 조회
    // (일자별)스케줄 조회

}
