package admin.login.model;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    private int adno;
    private String adpwd;
}
