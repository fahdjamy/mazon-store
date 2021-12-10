package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Payment;

import miu.edu.waa.backend.dto.PaymentDTO;
import miu.edu.waa.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface PaymentService {

    public void makePayment(PaymentDTO payment, User user, Long productId);
    public List<Payment> getBuyerPayments(Long userId);

}
