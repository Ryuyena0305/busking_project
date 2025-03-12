package seat.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import seat.model.dto.SeatDto;

import java.util.List;

@Mapper
public interface SeatMapper {

    @Insert("INSERT INTO busseat (bsnum, x, y, biid) SELECT bsnum, x, y, #{biid} FROM busseat WHERE biid = #{biid}")
    public int onPost(int biid, SeatDto seatDto);



    @Select("select * from busseat where biid = #{biid}")
    public List<SeatDto> onGet(int biid, SeatDto seatDto);

    @Update("update busseat set bsstate = #{bsstate} where biid = #{biid} and bsnum = #{bsnum}")
    public int onUpdate( SeatDto seatDto);



}
