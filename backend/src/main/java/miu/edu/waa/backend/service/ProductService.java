package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAll();

    ProductDTO getById(Long pdtId);

    ProductDTO createProduct(ProductDTO productDTO, User seller);

    void deleteProductById(Long pdtId) throws CustomException;

    void createProduct(Product pdt);

    List<ProductDTO> findProductsByLoggedInUser(User loggedInUser);

    ProductDTO updateProduct(ProductDTO productDTO, Long pdtId) throws CustomException;
}
