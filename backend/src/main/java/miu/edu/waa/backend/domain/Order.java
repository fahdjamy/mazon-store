package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="CUSTOMER_ORDERS")
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @ManyToOne
    private User buyer;
    private LocalDateTime createdAt = LocalDateTime.now();
    private OrderStatus status = OrderStatus.NOT_SHIPPED;

    @OneToOne
    private Product product;
}
