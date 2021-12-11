package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsBySellerId(@Param("sellerId") Long sellerId);
}
