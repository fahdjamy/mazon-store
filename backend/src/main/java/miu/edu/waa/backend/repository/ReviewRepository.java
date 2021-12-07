package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Review;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByProductId(@Param("productId") Long productId);
}
