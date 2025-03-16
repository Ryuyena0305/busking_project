package admin.bus.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusDto {
    private int biid;
    private String driver;
    private String binum;
    private int btid;
    private String btname;

}
