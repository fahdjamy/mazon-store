package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import miu.edu.waa.backend.domain.OrderStatus;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {
    private ProductDTO product;
    private OrderStatus status;
    private Long id;
}
