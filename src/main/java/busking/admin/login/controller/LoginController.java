package busking.admin.login.controller;

import busking.admin.login.model.LoginDto;
import busking.admin.login.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/busking/admin")
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping("/login")
    public boolean login(@RequestBody LoginDto loginDto , HttpServletRequest req){
        System.out.println("loginDto = " + loginDto + ", req = " + req);
        LoginDto result = loginService.login(loginDto);
        if(result == null){return false;}
        else{
            HttpSession session = req.getSession();
            session.setAttribute("loginDto", result);
            session.setMaxInactiveInterval(60 * 60);
            return true;
        }
    }
    @GetMapping("logout")
    public boolean logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session == null){return false;}
        session.removeAttribute("loginDto");
        return true;
    }
}
