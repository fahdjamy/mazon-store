package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private Integer price;

    private String name;
    private String imageCover;
    private String description;
    private Boolean isPurchased = false;

    @OneToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
