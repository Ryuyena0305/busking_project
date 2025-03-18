package busking.admin.login.model;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {
    @Select("select adno from admin where adpwd = #{adpwd}")
    public LoginDto login(LoginDto loginDto);
}
