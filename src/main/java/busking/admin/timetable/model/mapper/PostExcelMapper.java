package busking.admin.timetable.model.mapper;

import busking.admin.timetable.model.dto.PostExcelDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostExcelMapper {

    // 엑셀 데이터 삽입 메소드
    @Insert("INSERT INTO timetable (startdate, starttime, biid, locid, did)" +
            "SELECT  #{startDate}, #{startTime}, biid,  locid , did         " +
            "FROM businfo b " +
            "JOIN location l ON l.dest = #{dest}   " +
            "JOIN driver d ON d.dname = #{dname} " +
            "WHERE b.binum = #{binum}   ")
    void insertPostExcelData(PostExcelDto data);
}
