package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.domain.Address;

@Getter @Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private Role role;
    private String email;
    private String lastName;
    private String username;
    private String firstName;
    private boolean isApproved;
    private ShoppingCartDTO cart;
    private Address billingAddress;
    private Address shippingAddress;
}
