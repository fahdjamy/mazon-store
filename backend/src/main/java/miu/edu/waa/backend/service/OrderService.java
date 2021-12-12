package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.OrderDTO;
import miu.edu.waa.backend.dto.OrderReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface OrderService {
    OrderDTO getOneOrder(Long orderId);

    List<OrderDTO> getCustomerOrders(Long buyerId);

    OrderDTO cancelOrder(Long orderId) throws CustomException;

    OrderDTO updateOrder(Long orderId, OrderReqDTO orderReqDTO);

    OrderDTO createOrder(Long productId, User loggedInBuyer) throws CustomException;
}
