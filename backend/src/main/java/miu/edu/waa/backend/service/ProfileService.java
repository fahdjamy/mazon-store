package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.ProfileDto;

public interface ProfileService {
    ProfileDto getById(Long profileId);
    ProfileDto createUserProfile(User user,ProfileDto profileDto);
}
