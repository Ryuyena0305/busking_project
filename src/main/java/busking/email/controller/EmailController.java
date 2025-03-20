package busking.email.controller;

import busking.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {
//    @Autowired
//    private EmailService emailService;
//
//    @PostMapping("")
//    public String sendEmail(@RequestBody EmailDto emailDto){
//        // 이메일 주소 유효성 검사
//        if (emailDto.getEmail() == null || !emailDto.getEmail().contains("@")) {
//            return "유효한 이메일 주소를 입력해주세요.";
//        }
//        // 이메일 발송
//        emailService.sendMessage(emailDto.getEmail(), emailDto.getContent());
//        return "이메일이 성공적으로 전송되었습니다.";
//    }
}
