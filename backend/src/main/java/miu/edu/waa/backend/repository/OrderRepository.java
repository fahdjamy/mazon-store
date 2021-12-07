package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Order;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {}
