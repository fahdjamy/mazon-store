package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.domain.Address;

import java.io.Serializable;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class UserDTO implements Serializable {
    private Long id;
    private Role role;
    private String email;
    private Integer points;
    private String lastName;
    private String username;
    private String firstName;
    private boolean isFollowed;
    private boolean isApproved;
    private ShoppingCartDTO cart;
    private Address billingAddress;
    private Address shippingAddress;
    private List<FollowDto> following;
}
