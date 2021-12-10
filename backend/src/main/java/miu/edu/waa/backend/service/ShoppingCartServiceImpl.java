package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.ShoppingCart;
import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    @Autowired
    ShoppingCartRepository shoppingCartRepository;
    @Autowired
    ModelMapperUtil modelMapperUtil;
    @Override
    public List<ShoppingCartDTO> getAll() {
        List<ShoppingCart> cart = shoppingCartRepository.findAll();
        return modelMapperUtil.mapEntriesToList(cart, new ShoppingCartDTO());
    }

    @Override
    @PreAuthorize("hasAnyRole('ROLE_BUYER')")
    public ShoppingCartDTO getById(Long cartId) {

        ShoppingCart cart = shoppingCartRepository.findById(cartId).orElse(null);
        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }

    @Override
    @PreAuthorize("hasAnyRole('ROLE_BUYER')")
    public ShoppingCartDTO createProduct(ShoppingCartDTO shoppingCartDTO) {

        ShoppingCart cart = modelMapperUtil.mapEntryTo(shoppingCartDTO, new ShoppingCart());
        cart = shoppingCartRepository.save(cart);

        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }

    @Override
    public void deleteProductById(Long cartId) throws CustomException {
        ShoppingCart cart = shoppingCartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            throw new CustomException("product with id '" + cartId + "' does not exist.");
        }
        shoppingCartRepository.delete(cart);

    }

    @Override
    public ShoppingCartDTO updateProduct(ShoppingCartDTO shoppingCartDTO, Long cartId) throws CustomException {
        ShoppingCart cart = shoppingCartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            throw new CustomException("product with id '" + cartId + "' does not exist.");
        }
        shoppingCartRepository.save(modelMapperUtil.mapEntryTo(shoppingCartDTO, new ShoppingCart()));
        return shoppingCartDTO;
    }

}
