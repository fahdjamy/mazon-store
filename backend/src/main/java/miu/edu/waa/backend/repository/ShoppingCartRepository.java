package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart,Long> {


}
