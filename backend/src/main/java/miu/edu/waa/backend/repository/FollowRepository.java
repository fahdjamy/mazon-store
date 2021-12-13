package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByBuyerIdAndSellerId(
            @Param("buyerId") Long buyerId,
            @Param("sellerId") Long sellerId
    );
}

