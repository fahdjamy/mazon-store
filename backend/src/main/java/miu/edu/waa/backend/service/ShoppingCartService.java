package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;

import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartDTO> getAll();

    ShoppingCartDTO getById(Long cartId);

    void deleteShoppingCartById(Long cartId) throws CustomException;

    ShoppingCartDTO createShoppingCart(ShoppingCartDTO shoppingCartDTO);

    ShoppingCartDTO addProductToShoppingCart(Long productId, Long cartId) throws CustomException;
}
