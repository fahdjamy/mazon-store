package miu.edu.waa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.User;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingCartDTO {

    private long productId;
    private User buyer;

}
