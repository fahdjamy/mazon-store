package miu.edu.waa.backend.repository;

import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.domain.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findUserByRole(@Param("role") Role role);

    User findByUsername(@Param("username") String username);

    User findUserByIdAndRoleEquals(@Param("id") Long id, @Param("role") Role role);
}
