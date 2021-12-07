package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.exception.CustomException;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAll();
    ProductDTO getById(Long pdtId);
    ProductDTO createProduct(ProductDTO productDTO);
    void deleteProductById(Long pdtId) throws CustomException;
    ProductDTO updateProduct(ProductDTO productDTO, Long pdtId) throws CustomException;
}
