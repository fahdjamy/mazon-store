package miu.edu.waa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import miu.edu.waa.backend.domain.Profile;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FollowDto {
    private Profile from;
    private Profile to;
}
