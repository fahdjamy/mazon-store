package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Payment;
import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.PaymentDTO;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.PaymentRepository;
import miu.edu.waa.backend.repository.ProductRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService{

    private PaymentRepository paymentRepository;
    private ModelMapperUtil modelMapperUtil;
    private UserRepository userRepository;
    private ProductRepository productRepository;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setPaymentRepository(PaymentRepository paymentRepository){
        this.paymentRepository = paymentRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void makePayment(
            PaymentDTO payment,
            org.springframework.security.core.userdetails.User user,
            Long productId
    ) {
        Payment p = modelMapperUtil.mapEntryTo(payment, new Payment());
        User u = userRepository.findByUsername(user.getUsername());
        p.setBuyer(u);
        Product product = productRepository.getById(productId);
        p.setProduct(product);
        paymentRepository.save(p);
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public List<Payment> getBuyerPayments(Long userId) {
        return paymentRepository.findPaymentsByBuyerId(userId);
    }
}
