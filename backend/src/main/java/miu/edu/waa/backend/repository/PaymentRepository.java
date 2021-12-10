package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findAllById(Long id);
    List<Payment> findPaymentsByBuyerId(@Param("buyerId") Long buyerId);
}
