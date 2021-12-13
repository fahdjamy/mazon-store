package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Order;
import miu.edu.waa.backend.domain.OrderStatus;
import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.dto.OrderDTO;
import miu.edu.waa.backend.dto.OrderReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.OrderRepository;
import miu.edu.waa.backend.repository.ProductRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class OrderServiceImpl implements OrderService {
    private UserRepository userRepository;
    private ModelMapperUtil modelMapperUtil;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setOrderRepository(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER')")
    public OrderDTO getOneOrder(Long orderId) {
        return modelMapperUtil.mapEntryTo(
                orderRepository.findById(orderId)
                        .orElse(null),
                new OrderDTO()
        );
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER')")
    public OrderDTO updateOrder(Long orderId, OrderReqDTO orderReqDTO) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return null;
        }
        order.setStatus(orderReqDTO.getStatus());
        orderRepository.save(order);
        return modelMapperUtil.mapEntryTo(order, new OrderDTO());
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER')")
    public List<OrderDTO> getUserOrders(Long userId, User loggedInUser) {
        miu.edu.waa.backend.domain.User user = userRepository.findByUsername(loggedInUser.getUsername());
        List<Order> orders;
        if (user.getRole() == Role.BUYER) {
            orders = orderRepository.findAllByBuyerId(userId);
        } else {
            orders = orderRepository.findAllOrdersForSeller(user.getId());
        }
        return modelMapperUtil.mapEntriesToList(orders, new OrderDTO());
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public OrderDTO cancelOrder(Long orderId) throws CustomException {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            throw new CustomException("order with id '" + orderId + "' does not exist.");
        }
        if (order.getStatus() != OrderStatus.NOT_SHIPPED) {
            throw new CustomException("order cannot be cancelled with '" + order.getStatus() + "' status");
        }
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return modelMapperUtil.mapEntryTo(order, new OrderDTO());
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public OrderDTO createOrder(Long productId, User loggedInBuyer) throws CustomException {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            throw new CustomException("product with id '" + productId + "' does not exist.");
        }
        miu.edu.waa.backend.domain.User buyer = userRepository
                .findByUsername(loggedInBuyer.getUsername());
        if (orderRepository
                .findOrderByBuyerIdAndProductId(buyer.getId(),
                        productId) != null) {
            throw new CustomException("You have already placed an order for this product");
        }
        Order order = new Order();

        order.setProduct(product);
        order.setBuyer(buyer);

        orderRepository.save(order);
        return modelMapperUtil.mapEntryTo(order, new OrderDTO());
    }
}
