package miu.edu.waa.backend.service;

import miu.edu.waa.backend.dto.UserDTO;
import miu.edu.waa.backend.dto.UserRegDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAll();

    boolean deleteUser(Long userId);

    UserDTO getUserById(Long userId);

    UserDTO createUser(UserRegDTO userDto);

    UserDTO updateUser(Long userId, UserDTO userDTO);
}
