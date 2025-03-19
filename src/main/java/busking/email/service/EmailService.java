package busking.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendMessage(String email, String content){
        SimpleMailMessage message = new SimpleMailMessage();

        // 이메일을 받는 사람의 이메일 주소를 설정
        message.setTo(email); // 전달된 이메일 주소를 받는 사람으로 설정

        // 이메일 제목을 설정
        message.setSubject("이메일 문의"); // 제목을 적절하게 설정

        // 이메일 본문 내용 설정
        message.setText(content); // 전달된 내용으로 이메일 본문 설정

        // 보내는 사람 이메일 주소 설정 (필요시, 예: 구글 계정)
        message.setFrom("capzhang123@gmail.com"); // 보내는 사람 이메일 주소 설정

        // 이메일 발송
        mailSender.send(message);
    }
}
