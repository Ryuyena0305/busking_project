package admin.login.service;

import admin.login.model.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginMapper loginMapper;

    public boolean login(String adpwd) {
        String storedPassword = loginMapper.getAdminPassword();
        return storedPassword != null && storedPassword.equals(adpwd);
    }
}
