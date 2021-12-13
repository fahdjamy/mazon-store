package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import miu.edu.waa.backend.domain.Role;

@Getter @Setter
@NoArgsConstructor
public class FollowedSellerDTO {
    private Long id;
    private Role role;
    private String lastName;
    private String username;
    private String firstName;
    private boolean isApproved;
}
