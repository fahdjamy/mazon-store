package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import miu.edu.waa.backend.domain.OrderStatus;

@Getter
@Setter
@NoArgsConstructor
public class OrderReqDTO {
    private OrderStatus status;
}
