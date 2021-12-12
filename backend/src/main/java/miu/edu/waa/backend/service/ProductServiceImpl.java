package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ProductServiceImpl implements ProductService {
    private UserRepository userRepository;
    private ModelMapperUtil modelMapperUtil;
    private ProductRepository productRepository;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<ProductDTO> getAll() {
        List<Product> products = productRepository.findAll();
        return modelMapperUtil.mapEntriesToList(products, new ProductDTO());
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER')")
    public ProductDTO getById(Long pdtId) {
        Product p = productRepository.findById(pdtId).orElse(null);
        return modelMapperUtil.mapEntryTo(p, new ProductDTO());
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    public void deleteProductById(Long pdtId) throws CustomException {
        Product product = productRepository.findById(pdtId).orElse(null);
        if (product == null) {
            throw new CustomException("product with id '" + pdtId + "' does not exist.");
        }
        if (product.getIsPurchased()) {
            throw new CustomException("product is  already purchased.");
        }
        productRepository.delete(product);
    }

    public List<ProductDTO> findProductsByLoggedInUser(User loggedInUser) {
        miu.edu.waa.backend.domain.User user = userRepository
                .findByUsername(loggedInUser.getUsername());
        if (user != null && user.getRole() == Role.SELLER) {
            return modelMapperUtil.mapEntriesToList(
                    productRepository.findProductsBySellerId(user.getId()),
                    new ProductDTO()
            );
        }
        return getAll();
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ProductDTO createProduct(ProductDTO productDTO, User seller) {

        Product product = modelMapperUtil.mapEntryTo(productDTO, new Product());
        product = productRepository.save(product);
        product.setSeller(userRepository.findByUsername(seller.getUsername()));

        return modelMapperUtil.mapEntryTo(product, new ProductDTO());
    }

    @PreAuthorize("hasRole('ROLE_SELLER')")
    public ProductDTO updateProduct(ProductDTO productDTO, Long pdtId) throws CustomException {
        Product product = productRepository.findById(pdtId).orElse(null);
        if (product == null) {
            throw new CustomException("product with id '" + pdtId + "' does not exist.");
        }
        productRepository.save(modelMapperUtil.mapEntryTo(productDTO, new Product()));
        return productDTO;
    }
}
