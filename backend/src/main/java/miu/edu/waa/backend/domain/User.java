package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @JsonIgnore
    private String password;
    @NotEmpty(message = "First Name is required")
    @Size(min = 2, max = 20)
    private String firstName;
    @NotEmpty(message = "Last Name is required")
    @Size(min = 2, max = 20)
    private String lastName;
    @Email
    @NotEmpty
    private String email;
    @Column(unique = true)
    @NotEmpty(message = "username is required")
    private String username;

    @OneToMany
    @JoinTable(name = "user_order")
    private List<Order> orders;

    private Boolean isApproved = false;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "zip", column = @Column(name = "ship_zip")),
            @AttributeOverride(name = "city", column = @Column(name = "ship_city")),
            @AttributeOverride(name = "state", column = @Column(name = "ship_state")),
            @AttributeOverride(name = "street", column = @Column(name = "ship_street"))
    })
    private Address shippingAddress;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "zip", column = @Column(name = "bill_zip")),
            @AttributeOverride(name = "city", column = @Column(name = "bill_city")),
            @AttributeOverride(name = "state", column = @Column(name = "bill_state")),
            @AttributeOverride(name = "street", column = @Column(name = "bill_street"))
    })
    private Address billingAddress;

    /**
     * Returns granted Role as set of SimpleGrantedAuthority for the user.
     * granted authorities are used by spring for authentication.
     *
     * @return Set<SimpleGrantedAuthority>
     */
    public Set<SimpleGrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> permissions = new HashSet<>();
        permissions.add(new SimpleGrantedAuthority("ROLE_" + getRole().toString()));
        return permissions;
    }
}
