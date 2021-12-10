package miu.edu.waa.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long cartId;
    //private Boolean isAdded;

    @OneToMany
    private List<Product> product;

    @OneToOne
    @JoinColumn(name = "buyer_ID")
    private User buyer;

}
