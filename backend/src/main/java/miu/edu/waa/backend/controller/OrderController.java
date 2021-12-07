package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.OrderDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getSingleOrder(
            @PathVariable("orderId") Long orderId
    ) {
        return ResponseEntity.ok(orderService.getOneOrder(orderId));
    }

    @PostMapping("/{pdtId}")
    public ResponseEntity<OrderDTO> createOrder(
            @PathVariable("pdtId") Long pdtId,
            @AuthenticationPrincipal User user
    ) throws CustomException {
        return new ResponseEntity<>(
                orderService.createOrder(pdtId, user),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(
            @PathVariable("orderId") Long orderId
    ) throws CustomException {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok(
                new HashMap<>() {{
                    put("message", "order has been cancelled successfully");
                }}
        );
    }
}
