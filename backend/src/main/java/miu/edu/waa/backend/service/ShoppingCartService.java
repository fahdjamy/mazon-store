package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;

import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartDTO> getAll();
    ShoppingCartDTO getById(Long cartId);
    ShoppingCartDTO createProduct(ShoppingCartDTO shoppingCartDTO);
    void deleteProductById(Long cartId) throws CustomException;
    ShoppingCartDTO updateProduct(ShoppingCartDTO shoppingCartDTO, Long cartId) throws CustomException;
}
