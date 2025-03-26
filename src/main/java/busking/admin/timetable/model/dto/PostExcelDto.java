package busking.admin.timetable.model.dto;

import lombok.*;

import java.sql.Date;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class PostExcelDto {
    private String startDate;
    private String startTime;
    private String binum;
    private String dest;
}
