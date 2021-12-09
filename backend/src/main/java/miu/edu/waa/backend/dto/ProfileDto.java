package miu.edu.waa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miu.edu.waa.backend.domain.User;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfileDto {
    private String username;
    private String imageUrl;
    private User user;
}
