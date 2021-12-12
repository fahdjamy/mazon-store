package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.UserDTO;
import miu.edu.waa.backend.dto.UserRegDTO;
import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface UserService {
    List<UserDTO> getAll();

    miu.edu.waa.backend.domain.User createUser(miu.edu.waa.backend.domain.User user);

    boolean deleteUser(Long userId);

    UserDTO getUserById(Long userId);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    UserDTO getLoggedInUserDetails (User loggedInUser);

    boolean approveSeller(Long sellerId) throws CustomException;

    UserDTO createUser(UserRegDTO userDto) throws CustomException;
}
