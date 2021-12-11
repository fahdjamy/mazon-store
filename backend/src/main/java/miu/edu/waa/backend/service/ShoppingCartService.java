package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartDTO> getAll();

    ShoppingCartDTO getById(Long cartId);

    ShoppingCartDTO getUserCart(User user);

    void deleteShoppingCartById(Long cartId) throws CustomException;

    ShoppingCartDTO createShoppingCart(ShoppingCartDTO shoppingCartDTO);

    ShoppingCartDTO removeProductFromCart(Long cartId, Long productId) throws CustomException;

    ShoppingCartDTO addProductToShoppingCart(Long productId, Long cartId) throws CustomException;
}
