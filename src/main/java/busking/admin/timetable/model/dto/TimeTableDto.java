package busking.admin.timetable.model.dto;

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

    // 버스기사
    private String binum;
    private String driver;
    private String dest;
    private int did;
    private String dname;

    // 우수 버스기사
    private int timecount;
    private int rankno;
    private String dprofile;

    // 최근 7일 스케줄 건수 차트
    private String date;
    private int count;

}
