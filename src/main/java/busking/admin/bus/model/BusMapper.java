package busking.admin.bus.model;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BusMapper {
    @Insert("insert into businfo(binum, btid) values (#{binum}, #{btid})")
    public boolean onCreate(BusDto busDto);

    @Select("SELECT b.biid, b.binum, b.btid, t.btname\n" +
            "FROM businfo b\n" +
            "JOIN bustype t ON b.btid = t.btid\n")
    public abstract List<BusDto> onRead();

    @Select("SELECT b.biid, b.binum, b.btid, t.btname \n" +
            "FROM businfo b\n" +
            "JOIN bustype t ON b.btid = t.btid\n" +
            "WHERE b.biid = #{biid}")
    public abstract BusDto onView(int biid);

    @Update("update businfo set binum = #{binum}, btid = #{btid} where biid = #{biid}")
    public boolean onUpdate(BusDto busDto);

    @Delete("delete from businfo where biid = #{biid}")
    public boolean onDelete(int biid);
}
