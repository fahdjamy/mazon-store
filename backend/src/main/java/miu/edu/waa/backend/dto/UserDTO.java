package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;

import miu.edu.waa.backend.domain.Role;

@Getter @Setter
public class UserDTO {
    private Role role;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
}
