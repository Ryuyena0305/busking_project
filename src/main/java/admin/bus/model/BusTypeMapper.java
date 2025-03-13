package admin.bus.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BusTypeMapper {
    @Select("select * from bustype")
    public abstract List<BusTypeDto> getBusTypes();
}
