package busking.admin.driver.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverDto {
    private int did;
    private String dname;
    private String ddate;
    private String dphone;
    private String dprofile;

    private MultipartFile dimg;
}
