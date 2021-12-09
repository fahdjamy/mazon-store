package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.*;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.FollowService;
import miu.edu.waa.backend.service.OrderService;
import miu.edu.waa.backend.service.ProfileService;
import miu.edu.waa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;
    private OrderService orderService;

    private FollowService followService;
    private ProfileService profileService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    @Autowired
    public void setFollowService(FollowService followService) {
        this.followService = followService;
    }

    @Autowired
    public void setProfileService(ProfileService profileService) {
        this.profileService = profileService;
    }


    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createNewUser(
            @Valid @RequestBody UserRegDTO userRegDTO) throws ConstraintViolationException {
        UserDTO user = userService.createUser(userRegDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        boolean isDeleted = userService.deleteUser(userId);
        if (!isDeleted) {
            return new ResponseEntity<>(
                    new HashMap<>() {{
                        put("error", "user with id '" + userId + "' not found");
                    }},
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable("userId") Long userId) {
        UserDTO userDTO = userService.getUserById(userId);
        if (userDTO == null) {
            return new ResponseEntity<>(
                    new HashMap<>() {{
                        put("error", "user with id '" + userId + "' not found");
                    }},
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(
            @RequestBody @Valid UserDTO userDTO,
            @PathVariable("userId") Long userId
    ) {
        UserDTO updateUser = userService.updateUser(userId, userDTO);
        if (updateUser == null) {
            return new ResponseEntity<>(
                    new HashMap<>() {{
                        put("error", "user with id '" + userId + "' not found");
                    }},
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(updateUser);
    }

    @PutMapping("/{sellerId}/approve")
    public ResponseEntity<?> approveSeller(
            @PathVariable("sellerId") Long sellerId
    ) throws CustomException {
        userService.approveSeller(sellerId);
        return ResponseEntity.ok(
                new HashMap<>() {{
                    put("message", "Seller has been approved successfully");
                }}
        );
    }

    @GetMapping("/{buyerId}/orders")
    public ResponseEntity<?> getUserOrders(
            @PathVariable("buyerId") Long buyerId
    ) {
        return ResponseEntity.ok(orderService.getCustomerOrders(buyerId));
    }

    @PostMapping("/follow/{sellerId}")
    public ResponseEntity<?> followUser(
            @PathVariable("selleId") Long selleId,
            @AuthenticationPrincipal User buyer
    ) {
        followService.follow(buyer, selleId);
        return ResponseEntity.ok(
                new HashMap<>() {{
                    put("message", "You have Followed this seller");
                }});
    }

    @PostMapping("/follow/{Id}")
    public ResponseEntity<?> unFollowUser(
            @PathVariable("Id") Long Id
    ) {
        followService.unfollow(Id);
        return ResponseEntity.ok(
                new HashMap<>() {{
                    put("message", "You have UnFollowed this seller");
                }});
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<ProfileDto> createUserProfile(
            @PathVariable Long userId
    ) {
        return new ResponseEntity<>(profileService.getById(userId), HttpStatus.OK);
    }

    @PutMapping("/{buyerId}/orders/{orderId}")
    public ResponseEntity<?> updateUserOrder(
            @PathVariable("buyerId") Long buyerId,
            @PathVariable("orderId") Long orderId,
            @Valid @RequestBody OrderReqDTO orderReqDTO,
            Principal principal
    ) {
        OrderDTO orderDTO = orderService.updateOrder(orderId, orderReqDTO);
        return ResponseEntity.ok(orderDTO);
    }
}
