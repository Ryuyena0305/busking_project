package busking.admin.login.service;

import busking.admin.login.model.LoginDto;
import busking.admin.login.model.LoginMapper;
import lombok.RequiredArgsConstructor;
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
