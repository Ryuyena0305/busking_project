package busking.admin.driver.model.mapper;

import busking.admin.driver.model.dto.DriverDto;
import busking.admin.timetable.model.dto.TimeTableDto;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
public interface DriverMapper {

    // 버스기사별 스케줄 로그
    @Select("select * from timetable where did = #{did}")
    public List<TimeTableDto> getTimeLog(int did);


    // 버스기사 정보 가져오기
    @Select("select did, dname from driver order by dname")
    public List<DriverDto> getDriverInfo();

    // 버스기사 등록
    @Insert("insert into driver (dname, ddate, dphone, dprofile) values(#{dname}, #{ddate}, #{dphone}, #{dprofile})")
    public boolean create(DriverDto driverDto);


    // 버스기사 조회
    @Select("select * from driver")
    public List<DriverDto> findAll();

    // 버스기사 상세 조회
    @Select("select * from driver where did = #{did}")
    public DriverDto view(int did);

    // 버스기사 수정
    @Update("update driver set dname = #{dname}, ddate = #{ddate}, dphone = #{dphone} where did = #{did}")
    public boolean update(DriverDto driverDto);


    // 버스기사 삭제
    @Delete("delete from driver where did = #{did}")
    public boolean delete(int did);
}
