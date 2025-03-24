package busking.admin.driver.model.mapper;

import busking.admin.driver.model.dto.DriverDto;
import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
public interface DriverMapper {

    // 버스기사 등록
    @Insert("insert into driver (dname, ddate, dphone) values(#{dname}, #{ddate}, #{dphone})")
    public boolean create(@RequestBody DriverDto driverDto);


    // 버스기사 조회
    @Select("select * from driver")
    public List<DriverDto> findAll();

    // 버스기사 상세 조회
    @Select("select * from driver where did = #{did}")
    public DriverDto view(@RequestParam int did);

    // 버스기사 수정
    @Update("update driver set dname = #{dname}, ddate = #{ddate}, dphone = #{dphone} where did = #{did}")
    public boolean update(@RequestBody DriverDto driverDto);


    // 버스기사 삭제
    @Delete("delete from driver where did = #{did}")
    public boolean delete(@RequestParam int did);
}
