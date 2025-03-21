package busking.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendMessage(String email, byte[] content) throws MessagingException {
//        SimpleMailMessage message = new SimpleMailMessage();
//
//        // 이메일을 받는 사람의 이메일 주소를 설정
//        message.setTo(email); // 전달된 이메일 주소를 받는 사람으로 설정
//
//        // 이메일 제목을 설정
//        message.setSubject("이메일 문의");
//
//        message.setText( content ); // 본문에 이미지 보내기
//
//        message.setFrom("capzhang123@gmail.com"); // 보내는 사람 이메일 주소 설정
//
//        // 이메일 발송
//        mailSender.send(message);


        // 3. MimeMessage 객체 생성
        // * MIME = Multipurpose Internet Mail Extensions, 간단한 메세지가 아니고 html으로 작성되거나 파일 전송할 때 사용
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        // 3. 이메일 정보 설정
        helper.setFrom("capzhang123@gmail.com"); // 이메일 발송자
        helper.setTo(email); // 이메일 수신자
        helper.setSubject("예매가 완료되었습니다. QR 코드를 확인해주세요.");

        // 4. 이메일 본문 작성(HTML) 형식
        String mailContent = "QR 코드를 버스에 찍어주세요. QR 스캔 사이트 : https://qrscanner.net/ko";

        helper.setText(mailContent, true);

        // 5. 작성된 본문을 이메일 정보에 주입
        helper.setText(mailContent.toString(), true);

        // 6. QR코드 이미지 첨부
        ByteArrayResource qrCode = new ByteArrayResource(content);
        helper.addInline("qrcode", qrCode, "image/png");

        // 7. 이메일 발송
        mailSender.send(message);

    }
}
