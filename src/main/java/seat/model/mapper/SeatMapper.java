package seat.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import seat.model.dto.SeatDto;

import java.util.List;

@Mapper
public interface SeatMapper {
    @Select("select * from busseat where biid = #{biid}")
    public List<SeatDto> onPost(int biid, SeatDto seatDto);

    @Update("update busseat set bsnum = #{bsnum}:bsstate:biid writer = #{writer}, name = #{name}, comment = #{comment} where id = #{biid}")
    public int onUpdate( SeatDto seatDto);
}
