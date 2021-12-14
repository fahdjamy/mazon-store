package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDTO {
    private Long id;
    private String content;
    private Boolean approved;
}
