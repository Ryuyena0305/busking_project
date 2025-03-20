package busking.user.controller;

import busking.email.service.EmailService;
import busking.qrcode.service.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;
import busking.user.model.dto.ResDto;
import busking.user.service.ResService;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resv")
@CrossOrigin("http://localhost:5173")
public class ResController {

    @Autowired
    private ResService resService;

    @GetMapping("/date")
    public List<String> getDates() {
        return resService.getStart();
    }

    @GetMapping("/dest")
    public List<String> getLocation(@RequestParam("startdate") String startdate) {
        return resService.getLocation(startdate);
    }

    @GetMapping("/time")
    public List<Map<Object,Object>> getStartTime(@RequestParam("startdate") String startdate, @RequestParam("dest") String dest) {
        return resService.getStartTime(startdate, dest);
    }
//    @GetMapping("/seat")
//    public List<String> getSeat(@RequestParam("startdate") String startdate,
//                                @RequestParam("dest") String dest,
//                                @RequestParam("starttime") String starttime,
//                                @RequestParam("timeid") int timeid) {  // timeid를 파라미터로 받음
//        return resService.getSeat(startdate, dest, starttime, timeid);  // 서비스 메서드 호출 시 timeid 넘겨줌
//    }
    @GetMapping("/seat")
    public List<Map<String,Object>> getResvDetail(@RequestParam("timeid")int timeid) {
        return resService.getResvDetail(timeid);
    }

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private QRCodeService qrCodeService;

    @PostMapping("")
    public int Reservation(@RequestBody ResDto resDto) {

        try {
            System.out.println("resDto = " + resDto);
            int result = resService.Reservation(resDto);
            if(result > 0) {

                String filePath = "qrcode.png";
                byte[] qrCodeImage = qrCodeService.generateQRCodeImage("good", 300, 300);
                //qrCodeService.saveQRCodeImage(qrCodeImage, filePath);

                File file = new File(filePath);
                Resource resource = new UrlResource(file.toURI());
                
                emailService.sendMessage(resDto.getPhone(), qrCodeImage );
            }
            return result;
        } catch (Exception e) {
            System.out.println(e);
            return 0;
        }
    }
    @GetMapping("/price")
    public int calculatePrice(@RequestParam String startdate,
                              @RequestParam String dest,
                              @RequestParam String starttime) {
        try {
            // 가격 계산 서비스 호출
            return resService.calculatePrice(startdate, dest, starttime);
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            return 0;  // 예외 발생 시 0을 반환
        }
    }
    @GetMapping("/timeinfo")
    public ResDto getTimeInfo(@RequestParam int timeid) {
        return resService.getTimeInfo(timeid);
    }
}

