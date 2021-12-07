package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
//import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class Address {
//    @NotEmpty
    private String zip;
//    @NotEmpty
    private String city;
//    @NotEmpty
    private String state;
//    @NotEmpty
    private String street;
}
