package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue
    private Long id;
    private Integer cvv;
    private Long cardNumber;
    private String expiryDate;
    private LocalDate createdAt = LocalDate.now();

    @ManyToOne
    private User buyer;
    @OneToOne
    private Product product;
}
