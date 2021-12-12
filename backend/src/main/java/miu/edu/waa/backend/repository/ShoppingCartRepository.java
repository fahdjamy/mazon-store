package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.ShoppingCart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findShoppingCartByBuyerId(@Param("buyerId") Long buyerId);
}
