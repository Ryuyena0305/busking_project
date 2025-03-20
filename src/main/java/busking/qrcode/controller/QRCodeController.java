package busking.qrcode.controller;

import busking.qrcode.service.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/qr")
public class QRCodeController {
//    @Autowired
//    private QRCodeService QRCodeService;
//
//    @GetMapping("/generate")
//    public ResponseEntity<Resource> generateQRCode(@RequestParam String text) throws Exception {
//        String filePath = "qrcode.png";
//        BufferedImage qrCodeImage = QRCodeService.generateQRCodeImage(text, 300, 300);
//        QRCodeService.saveQRCodeImage(qrCodeImage, filePath);
//
//        File file = new File(filePath);
//        Resource resource = new UrlResource(file.toURI());
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_PNG)
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
//                .body(resource);
//    }
}
