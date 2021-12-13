package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.ReviewDTO;
import miu.edu.waa.backend.dto.ReviewReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface ReviewService {
    ReviewDTO getById(Long rvId);

    List<ReviewDTO> getAllReviews();

    void deleteById(Long rvId) throws CustomException;

    void approveReview(Long rvId) throws CustomException;

    List<ReviewDTO> getAllReviewsByProductId(Long productId);

    ReviewDTO createReview(User buyer, Long pdtId, ReviewReqDTO reviewDTO);

    ReviewDTO updateReview(Long rvId, ReviewDTO reviewDTO) throws CustomException;
}
