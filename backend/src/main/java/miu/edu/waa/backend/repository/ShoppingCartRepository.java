package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.ShoppingCart;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    boolean existsByCartIdAndProductsContains(long cartId, List<Product> products);
}
