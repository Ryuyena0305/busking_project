package busking.admin.timetable.model.dto;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcelDto {


        private int timeid;
        private String starttime;
        private String startdate;
        private int biid;
        private int locid;
        private String binum;
        private String dname;
        private String dest;


}
