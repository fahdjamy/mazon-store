package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.dto.ReviewDTO;
import miu.edu.waa.backend.dto.ReviewReqDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Reviews")

public class ReviewController {
   @Autowired
    ReviewService reviewService;


    @PutMapping("/{rvId})")
    void approveReview(Long rvId) throws CustomException{
        reviewService.approveReview(rvId);
    }
    @GetMapping
    List<ReviewDTO> getAllReviewsByProductId(Long productId){
        return reviewService.getAllReviewsByProductId(productId);
    }
    @DeleteMapping("/{rvId}")
    void deleteById(@PathVariable Long rvId) throws CustomException{
        reviewService.deleteById(rvId);
    }
    @PostMapping("/{pdId}")
    ReviewDTO createReview(@AuthenticationPrincipal User buyer, @PathVariable Long pdtId, @RequestBody ReviewReqDTO reviewDTO){
        return reviewService.createReview(buyer,pdtId,reviewDTO);
    }

    @PutMapping("/{rvId}")
    ReviewDTO updateReview(@PathVariable Long rvId, @RequestBody ReviewDTO reviewDTO) throws CustomException{
        return reviewService.updateReview(rvId,reviewDTO);
    }

}
