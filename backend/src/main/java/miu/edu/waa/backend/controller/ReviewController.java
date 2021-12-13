package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.ReviewDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private ReviewService reviewService;

    @Autowired
    public void setReviewService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAllProductsReviews() {
        return ResponseEntity.ok(
                reviewService.getAllReviews()
        );
    }

    @PutMapping("/{rvId}/approve")
    public void approveReview(
            @PathVariable("rvId") Long rvId
    ) throws CustomException {
        reviewService.approveReview(rvId);
    }

    @DeleteMapping("/{rvId}")
    public void deleteById(@PathVariable Long rvId) throws CustomException {
        reviewService.deleteById(rvId);
    }

    @PutMapping("/{rvId}")
    public ResponseEntity<ReviewDTO> updateReview(
            @PathVariable Long rvId,
            @RequestBody ReviewDTO reviewDTO
    ) throws CustomException {
        return ResponseEntity.ok(
                reviewService.updateReview(rvId, reviewDTO)
        );
    }
}
