package busking.user.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResDto {
    private String phone;
    private String startdate;
    private String dest;
    private String starttime;
    private List<Integer> bsnum;
    private int timeid;
    private int resvid;
    private int rprice;
    private int btprice;
    private int locprice;
    private int locid;
    private int total;
    private int biid;

    public void setTotal(int btprice, int locprice) {
        this.rprice = btprice + locprice;
    }

    public int getTotal() {
        return this.rprice * (this.bsnum != null ? this.bsnum.size() : 0);
    }
}
