package admin.login.controller;

import admin.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/login")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("")
    public ResponseEntity<Map<String, Boolean>> login(@RequestBody Map<String, String> request) {
        String adpwd = request.get("adpwd");

        boolean isAuthenticated = loginService.login(adpwd);

        return ResponseEntity.ok(Map.of("success", isAuthenticated));
    }
}
