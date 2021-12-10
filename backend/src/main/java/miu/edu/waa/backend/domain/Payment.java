package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
    private Long cardNumber;
    private LocalDate expiryDate;
    private LocalDate createdAt;
    private Integer cvv;
    @ManyToOne
    private User buyer;
    @OneToOne
    private Product product;
}
