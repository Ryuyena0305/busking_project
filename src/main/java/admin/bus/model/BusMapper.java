package admin.bus.model;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BusMapper {
    @Insert("insert into businfo(driver, binum, btid) values (#{driver}, #{binum}, #{btid})")
    public boolean onCreate(BusDto busDto);

    @Select("select * from businfo")
    public abstract List<BusDto> onRead();

    @Select("select * from businfo where biid = #{biid}")
    public abstract BusDto onView(int biid);

    @Update("update businfo set driver = #{driver}, binum = #{binum}, btid = #{btid} where biid = #{biid}")
    public boolean onUpdate(BusDto busDto);

    @Delete("delete from businfo where biid = #{biid}")
    public boolean onDelete(int biid);
}
