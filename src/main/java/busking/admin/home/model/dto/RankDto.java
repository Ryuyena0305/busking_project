package busking.admin.home.model.dto;

import lombok.*;

@Setter
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RankDto {
    private String dname;
    private String dprofile;
    private int timecount;
    private int rankno;

}
