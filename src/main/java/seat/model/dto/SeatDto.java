package seat.model.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SeatDto {
    private int btid;
    private String btname;
    private int btprice;

    private int biid;
    private String driver;
    private String binum;
    private int btseat;

    private int bsid;
    private int bsnum;
    private int bsstate;
    private int x;
    private int y;
}
