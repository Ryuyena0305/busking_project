package busking.admin.driver.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {
    String baseDir = System.getProperty("user.dir");
    String uploadPath = baseDir+"/build/resources/main/static/upload/";

    public String upload(MultipartFile multipartFile){
        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + "_" + multipartFile.getOriginalFilename().replaceAll("_","-");
        String filePath = uploadPath + fileName;

        File file = new File( filePath );
        try {
            multipartFile.transferTo(file);
        }catch (IOException e){
            System.out.println(e);
            return null;
        }
        return fileName;
    }

}
