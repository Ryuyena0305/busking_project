package admin.timetable.model.dto;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeTableDto {
    private int timeid;
    private String starttime;
    private String startdate;
    private int biid;
    private int locid;
}
