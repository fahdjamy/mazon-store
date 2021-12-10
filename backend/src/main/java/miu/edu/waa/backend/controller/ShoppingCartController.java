package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.ProductDTO;
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
                shoppingCartService.createProduct(shoppingCartDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ShoppingCartDTO>> getAllProducts () {
        return ResponseEntity.ok(shoppingCartService.getAll());
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<ShoppingCartDTO> findProductById(
            @PathVariable("cartId") Long cartId) {
        return ResponseEntity.ok(shoppingCartService.getById(cartId));
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<ShoppingCartDTO> updateProduct(
            @Valid @RequestBody ShoppingCartDTO shoppingCartDTO,
            @PathVariable("cartId") Long cartId) throws CustomException {
        return ResponseEntity.ok(shoppingCartService.updateProduct(shoppingCartDTO, cartId));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("cartId") Long cartId) throws CustomException {
        shoppingCartService.deleteProductById(cartId);
        return ResponseEntity.ok().build();
    }
}
