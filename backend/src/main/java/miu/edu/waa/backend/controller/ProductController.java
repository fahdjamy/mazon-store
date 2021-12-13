package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.PaymentDTO;
import miu.edu.waa.backend.dto.ProductDTO;
import miu.edu.waa.backend.dto.ReviewDTO;
import miu.edu.waa.backend.dto.ReviewReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.PaymentService;
import miu.edu.waa.backend.service.ProductService;
import miu.edu.waa.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private ReviewService reviewService;
    private ProductService productService;
    private PaymentService paymentService;

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    @Autowired
    public void setReviewService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody ProductDTO productDTO,
            @AuthenticationPrincipal User seller
    ) {
        return new ResponseEntity<>(
                productService.createProduct(productDTO, seller),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts (
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(productService.findProductsByLoggedInUser(user));
    }

    @GetMapping("/{pdtId}")
    public ResponseEntity<ProductDTO> findProductById(
            @PathVariable("pdtId") Long pdtId
    ) {
        return ResponseEntity.ok(productService.getById(pdtId));
    }

    @PutMapping("/{pdtId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @Valid @RequestBody ProductDTO productDTO,
            @PathVariable("pdtId") Long pdtId
    ) throws CustomException {
        return ResponseEntity.ok(productService.updateProduct(productDTO, pdtId));
    }

    @DeleteMapping("/{pdtId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("pdtId") Long pdtId) throws CustomException {
        productService.deleteProductById(pdtId);
        return ResponseEntity.ok().build();
    }

    //////////////// Product Reviews ////////////////
    @GetMapping("/{pdtId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getProductReviews(@PathVariable("pdtId") Long pdtId) {
        List<ReviewDTO> reviews = reviewService.getAllReviewsByProductId(pdtId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{pdtId}/reviews")
    public ResponseEntity<ReviewDTO> createProductReview(
            @PathVariable("pdtId") Long pdtId,
            @AuthenticationPrincipal User loggedBuyer,
            @Valid @RequestBody ReviewReqDTO reviewDTO
            ) {
        ReviewDTO createdReview = reviewService.createReview(loggedBuyer, pdtId, reviewDTO);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping("/{pdtId}/reviews/{reviewId}")
    public ResponseEntity<ReviewDTO> getProductSingleReview(
            @PathVariable("pdtId") Long pdtId,
            @PathVariable("reviewId") Long reviewId
    ) {
        return ResponseEntity.ok(
                reviewService.getById(reviewId)
        );
    }

    @PutMapping("/{pdtId}/reviews/{reviewId}/approve")
    public ResponseEntity<?> approveProductReview(
            @PathVariable("pdtId") Long pdtId,
            @PathVariable("reviewId") Long reviewId
    ) throws CustomException {
        reviewService.approveReview(reviewId);
        return ResponseEntity.ok(
                new HashMap<>(){{
                    put("message", "review approved");
                }}
        );
    }

    @PostMapping("/{pdtId}/payment")
    public ResponseEntity<?> makeProductPayment(
            @PathVariable("pdtId") Long productId,
            @AuthenticationPrincipal User loggedInBuyer,
            @Valid @RequestBody PaymentDTO paymentDTO
    ) {
        return ResponseEntity.ok(
                paymentService.makePayment(
                        paymentDTO,
                        loggedInBuyer,
                        productId
                )
        );
    }
}
