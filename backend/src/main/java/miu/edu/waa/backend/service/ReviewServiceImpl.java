package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.Review;
import miu.edu.waa.backend.dto.ReviewDTO;
import miu.edu.waa.backend.dto.ReviewReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.ProductRepository;
import miu.edu.waa.backend.repository.ReviewRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ReviewServiceImpl implements ReviewService {
    private UserRepository userRepository;
    private ModelMapperUtil modelMapperUtil;
    private ReviewRepository reviewRepository;
    private ProductRepository productRepository;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setReviewRepository(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER', 'ROLE_ADMIN')")
    public List<ReviewDTO> getAllReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findAll();
        return modelMapperUtil.mapEntriesToList(reviews, new ReviewDTO());
    }

    @PreAuthorize("hasAnyRole('ROLE_BUYER', 'ROLE_SELLER', 'ROLE_ADMIN')")
    public ReviewDTO getById(Long rvId) {
        Review review = reviewRepository.findById(rvId).orElse(null);
        if (review == null) {
            return null;
        }
        return modelMapperUtil.mapEntryTo(review, new ReviewDTO());
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public ReviewDTO createReview(
            User loggedInBuyer,
            Long pdtId,
            ReviewReqDTO reviewDTO) {

        miu.edu.waa.backend.domain.User buyer = userRepository
                .findByUsername(loggedInBuyer.getUsername());
        Review review = modelMapperUtil.mapEntryTo(reviewDTO, new Review());
        Product product = productRepository.findById(pdtId).orElse(null);

        review.setOwner(buyer);
        review.setProduct(product);
        reviewRepository.save(review);

        return modelMapperUtil.mapEntryTo(review, new ReviewDTO());
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void deleteById(Long rvId) throws CustomException {
        Review review = reviewRepository.findById(rvId).orElse(null);
        if (review == null) {
            throw new CustomException("review with id '" + rvId + "' does not exist");
        }
        reviewRepository.deleteById(rvId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void approveReview(Long rvId) throws CustomException {
        Review review = reviewRepository.findById(rvId).orElse(null);
        if (review == null) {
            throw new CustomException("review with id '" + rvId + "' does not exist");
        }
        review.setApproved(true);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ReviewDTO updateReview(Long rvId, ReviewDTO reviewDTO) throws CustomException {
        Review review = reviewRepository.findById(rvId).orElse(null);
        if (review == null) {
            throw new CustomException("review with id '" + rvId + "' does not exist");
        }
        review = modelMapperUtil.mapEntryTo(reviewDTO, new Review());
        reviewRepository.save(review);
        return reviewDTO;
    }
}
