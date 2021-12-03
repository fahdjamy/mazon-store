package miu.edu.waa.backend.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Setter @Getter
@NoArgsConstructor
public class Authentication {
    @NotEmpty(message = "password is required")
    private String username;
    @NotEmpty(message = "username is required")
    private String password;
}
