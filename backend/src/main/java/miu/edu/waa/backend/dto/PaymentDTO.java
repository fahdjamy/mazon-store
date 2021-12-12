package miu.edu.waa.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDTO {
    @NotNull
    private Integer cvv;

    @NotNull
    private Long cardNumber;

    @NotEmpty
    @Size(message = "expiry date should be 4 digits", max = 5, min = 5)
    private String expiryDate;
}
