package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;

import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartDTO> getAll();
    ShoppingCartDTO getById(Long cartId);
    ShoppingCartDTO createShoppingCart(ShoppingCartDTO shoppingCartDTO);
    void deleteShoppingCartById(Long cartId) throws CustomException;
    ShoppingCartDTO updateShoppingCart(ShoppingCartDTO shoppingCartDTO, Long cartId) throws CustomException;
}
