package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDTO {

    private Integer cvv;
    private Long cardNumber;
    private LocalDate expiryDate;
}
