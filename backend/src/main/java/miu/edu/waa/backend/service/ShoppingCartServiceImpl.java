package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.ShoppingCart;
import miu.edu.waa.backend.dto.ShoppingCartDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.ProductRepository;
import miu.edu.waa.backend.repository.ShoppingCartRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ShoppingCartServiceImpl implements ShoppingCartService {
    private UserRepository userRepository;
    private ModelMapperUtil modelMapperUtil;
    private ProductRepository productRepository;
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setShoppingCartRepository(
            ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ShoppingCartDTO> getAll() {
        List<ShoppingCart> cart = shoppingCartRepository.findAll();
        return modelMapperUtil.mapEntriesToList(cart, new ShoppingCartDTO());
    }

    @Override
    @PreAuthorize("hasAnyRole('ROLE_BUYER')")
    public ShoppingCartDTO getById(Long cartId) {
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElse(null);
        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER')")
    public ShoppingCartDTO getUserCart(User user) {
        miu.edu.waa.backend.domain.User buyer = userRepository
                .findByUsername(user.getUsername());
        ShoppingCart cart = shoppingCartRepository.findShoppingCartByBuyerId(
                buyer
                        .getId()
        );
        return modelMapperUtil.mapEntryTo(cart,
                new ShoppingCartDTO()
        );
    }

    @Override
    @PreAuthorize("hasAnyRole('ROLE_BUYER')")
    public ShoppingCartDTO createShoppingCart(ShoppingCartDTO shoppingCartDTO) {

        ShoppingCart cart = modelMapperUtil.mapEntryTo(
                shoppingCartDTO, new ShoppingCart());
        cart = shoppingCartRepository.save(cart);

        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }

    @Override
    public ShoppingCartDTO removeProductFromCart(
            Long cartId,
            Long productId
    ) throws CustomException {
        ShoppingCart cart = getCart(cartId);
        Product product = cart.getProducts().stream()
                .filter(p -> p.getId() == productId)
                .findFirst().orElse(null);

        if (product == null) {
            throw new CustomException(
                    "product with id '" + productId + "' is not added to this cart."
            );
        }

        cart.getProducts().remove(product);
        shoppingCartRepository.save(cart);
        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }

    private ShoppingCart getCart(Long cartId) throws CustomException {
        ShoppingCart cart = shoppingCartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            throw new CustomException("cart with id '" + cartId + "' does not exist.");
        }
        return cart;
    }

    private Product getProduct(Long productId) throws CustomException {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) {
            throw new CustomException("product with id '" + productId + "' does not exist.");
        }
        return product;
    }

    @Override
    public void deleteShoppingCartById(Long cartId) throws CustomException {
        ShoppingCart cart = shoppingCartRepository.findById(cartId).orElse(null);
        if (cart == null) {
            throw new CustomException("product with id '" + cartId + "' does not exist.");
        }
        shoppingCartRepository.delete(cart);
    }

    @Override
    public ShoppingCartDTO addProductToShoppingCart(
            Long productId, Long cartId) throws CustomException {
        ShoppingCart cart = getCart(cartId);
        Product product = cart.getProducts().stream()
                .filter(p -> p.getId() == productId)
                .findFirst().orElse(null);

        if (product != null) {
            throw new CustomException(
                    "product with id is already added to cart."
            );
        }

        product = getProduct(productId);
        cart.addToCart(product);
        shoppingCartRepository.save(cart);
        return modelMapperUtil.mapEntryTo(cart, new ShoppingCartDTO());
    }
}
