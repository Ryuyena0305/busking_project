package busking.admin.driver.model.dto;

import lombok.*;

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
}
