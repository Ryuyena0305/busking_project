package busking.admin.timetable.model.mapper;

import busking.admin.timetable.model.dto.TimeTableDto;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface TimeTableMapper {

    // 버스 정보 가져오기
    @Select("select biid, binum from businfo order by binum")
    public List<TimeTableDto> getBusInfo();

    // 터미널 정보 가져오기
    @Select("select locid, dest from location order by dest")
    public List<TimeTableDto> getLoc();


    // 스케줄 등록
    @Insert("insert into timetable (starttime,startdate,biid,locid,did) values(#{starttime},#{startdate},#{biid},#{locid}, #{did})")
    public boolean create(TimeTableDto timeTableDto);

    // 스케줄 상세 조회(겸용)
    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid, d.did\n" +
            "from timetable time\n" +
            "join businfo info on time.biid = info.biid\n" +
            "join location loc on time.locid = loc.locid\n" +
            "join driver d on time.did = d.did\n" +
            "where time.timeid = #{timeid}")
    public TimeTableDto view(String timeid);

    // 스케줄 수정
    @Update("update timetable set starttime = #{starttime}, startdate = #{startdate}, biid = #{biid}, locid = #{locid}, did = #{did} where timeid = #{timeid}")
    public boolean update(TimeTableDto timeTableDto);

    // 스케줄 삭제
    @Delete("delete from timetable where timeid = #{timeid}")
    public boolean delete(String timeid);

    // (도착지별)스케줄 조회
    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid, d.did\n" +
            "from timetable time\n" +
            "join businfo info on time.biid = info.biid\n" +
            "join location loc on time.locid = loc.locid\n" +
            "join driver d on time.did = d.did\n" +
            "where time.locid = #{locid}")
    public List<TimeTableDto> locView(int locid);

    // (버스별)스케줄 조회
    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid, d.did\n" +
            "from timetable time\n" +
            "join businfo info on time.biid = info.biid\n" +
            "join location loc on time.locid = loc.locid\n" +
            "join driver d on time.did = d.did\n" +
            "where time.biid = #{biid}")
    public List<TimeTableDto> busView(int biid);

    // (일자별)스케줄 조회
    @Select("select time.timeid, time.startdate, time.starttime, info.binum, d.dname, loc.dest, info.biid, loc.locid, d.did\n" +
            "from timetable time\n" +
            "join businfo info on time.biid = info.biid\n" +
            "join location loc on time.locid = loc.locid\n" +
            "join driver d on time.did = d.did\n" +
            "where startdate = #{startdate}")
    public List<TimeTableDto> dateView(String startdate);

}
