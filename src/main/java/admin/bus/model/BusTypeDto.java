package admin.bus.model;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BusTypeDto {
    private int btid;
    private String btname;
    private int seat;
    private int btprice;
}
