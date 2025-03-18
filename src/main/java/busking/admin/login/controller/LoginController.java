package busking.admin.login.controller;

import busking.admin.login.model.LoginDto;
import busking.admin.login.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/busking/admin")
@CrossOrigin("http://localhost:5173")
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
    @GetMapping("/logout")
    public boolean logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session == null){return false;}
        session.removeAttribute("loginDto");
        return true;
    }
    @GetMapping("/info")
    public boolean info( HttpServletRequest request ){
        HttpSession session = request.getSession();// 1. 세션호출
        Object object = session.getAttribute("loginDto"); // 3. 로그인 성공시 저장한 loginDto 의 로그인정보를 꺼낸다.
        if( object == null){return false;} // 2. 만약에 세션이 존재하지 않으면 null 반환
        return true; // 5. 로그인된 정보 반환
    }
}
