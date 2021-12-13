package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
