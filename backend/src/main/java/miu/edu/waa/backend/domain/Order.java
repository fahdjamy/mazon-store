package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @ManyToOne
    private User buyer;

    private OrderStatus status;

    @OneToMany
    private List<Product> product;
}
