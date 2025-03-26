package busking.admin.resvlog.model.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResvlogDto {
    private int resvid;
    private String email;
    private int total;
    private String startdate;
    private String starttime;
    private String dest;
    private String bsnum;

    private boolean bsstate;


    // 좌석 번호를 리스트로 변환하여 반환
    public List<Integer> getBsnum() {
        if (this.bsnum == null || this.bsnum.isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.stream(this.bsnum.split(",")) // 쉼표 기준으로 나눔
                .map(Integer::parseInt)      // Integer로 변환
                .collect(Collectors.toList());
    }

}