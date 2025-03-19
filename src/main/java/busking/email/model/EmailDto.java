package busking.email.model;

import lombok.*;
import org.apache.ibatis.annotations.Select;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailDto {
    private String email;
    private String content;
}
