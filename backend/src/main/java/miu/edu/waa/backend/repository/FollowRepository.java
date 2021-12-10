package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long> {
}
