package busking.admin.driver.controller;

import busking.admin.driver.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/driver/file")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    // 업로드
    @PostMapping("/upload")
    public String upload(MultipartFile multipartFile){
        System.out.println("FileController.fileUpload");
        System.out.println("multipartFile = " + multipartFile);
        String result = fileService.upload( multipartFile );
        return result;
    }

}
