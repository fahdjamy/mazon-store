package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/shoppingCart")

public class ShoppingCartController {
    @Autowired
    ShoppingCartService shoppingCartService;

    @PostMapping
    public ResponseEntity<ShoppingCartDTO> createProduct(
            @Valid @RequestBody ShoppingCartDTO shoppingCartDTO) {
        return new ResponseEntity<>(
                shoppingCartService.createShoppingCart(shoppingCartDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ShoppingCartDTO>> getAllShoppingCart () {
        return ResponseEntity.ok(shoppingCartService.getAll());
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<ShoppingCartDTO> findShoppingCartById(
            @PathVariable("cartId") Long cartId) {
        return ResponseEntity.ok(shoppingCartService.getById(cartId));
    }

    @PutMapping("/{cartId}/approve")
    public ResponseEntity<ShoppingCartDTO> updateShoppingCart(
            @Valid @RequestBody ShoppingCartDTO shoppingCartDTO,
            @PathVariable("cartId") Long cartId) throws CustomException {
        return ResponseEntity.ok(shoppingCartService.updateShoppingCart(shoppingCartDTO, cartId));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> deleteShoppingCart(@PathVariable("cartId") Long cartId) throws CustomException {
        shoppingCartService.deleteShoppingCartById(cartId);
        return ResponseEntity.ok().build();
    }
}
