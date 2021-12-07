package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "buyer_id")
    private User owner;

    private String content;

    @ManyToOne
    private Product product;

    private Boolean approved;
}
