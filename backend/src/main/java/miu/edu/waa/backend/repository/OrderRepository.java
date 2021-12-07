package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Order;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByBuyerId(@Param("buyerId") Long buyerId);
}
