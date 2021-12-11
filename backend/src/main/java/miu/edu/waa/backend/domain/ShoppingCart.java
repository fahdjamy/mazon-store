package miu.edu.waa.backend.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCart {
    @Id
    @GeneratedValue
    private long id;

    @OneToMany
    private List<Product> products;

    @OneToOne
    @JoinColumn(name = "BUYER_ID")
    private User buyer;

    public void addToCart(Product product) {
        products.add(product);
    }
}
