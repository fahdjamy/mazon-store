package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import miu.edu.waa.backend.domain.OrderStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class OrderDTO {
    private Long id;
    private ProductDTO product;
    private OrderStatus status;
    private LocalDateTime createdAt;
}
