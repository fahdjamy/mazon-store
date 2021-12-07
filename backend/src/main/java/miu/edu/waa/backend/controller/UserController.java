package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.UserDTO;
import miu.edu.waa.backend.dto.UserRegDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
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
}
