package busking.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendMessage(String email, BufferedImage content){
        SimpleMailMessage message = new SimpleMailMessage();

        // 이메일을 받는 사람의 이메일 주소를 설정
        message.setTo(email); // 전달된 이메일 주소를 받는 사람으로 설정

        // 이메일 제목을 설정
        message.setSubject("이메일 문의"); 

        message.setText( content ); // 본문에 이미지 보내기

        message.setFrom("capzhang123@gmail.com"); // 보내는 사람 이메일 주소 설정

        // 이메일 발송
        mailSender.send(message);
    }
}
