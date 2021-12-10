package miu.edu.waa.backend.dto;

import lombok.*;
import miu.edu.waa.backend.domain.Role;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Getter
@Setter
@NoArgsConstructor
public class UserRegDTO {
    @NotEmpty(message = "password is required")
    private String password;

    @Size(min = 2, max = 20, message = "{Size}")
    @NotEmpty(message = "first name is required")
    private String firstName;

    @NotEmpty(message = "last name is required")
    @Size(min = 2, max = 20)
    private String lastName;

    @Email
    @NotEmpty(message = "email is required")
    private String email;

    @NotEmpty(message = "username is required")
    @Size(min = 2, max = 20, message = "username be between {1} and {0} characters")
    private String username;

    @NotNull(message = "role is required")
//    @Size(min = 2, message = "role must be at least {1} characters")
    @Enumerated(EnumType.STRING)
    private Role role;
}
