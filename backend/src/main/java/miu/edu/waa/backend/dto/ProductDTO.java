package miu.edu.waa.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private Integer price;
    private String name;
    private String imageCover;
    private String description;

}
