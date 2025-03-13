package admin.login.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {
    @Select("select adpwd from admin LIMIT 1")
    String getAdminPassword();
}
