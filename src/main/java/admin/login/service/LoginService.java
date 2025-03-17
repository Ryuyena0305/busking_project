package admin.login.service;

import admin.login.model.LoginDto;
import admin.login.model.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginMapper loginMapper;

    public LoginDto login(LoginDto loginDto){
        LoginDto result = loginMapper.login(loginDto);
        return result;
    }


}
