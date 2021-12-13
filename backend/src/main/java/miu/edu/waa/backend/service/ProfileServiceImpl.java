package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Profile;
import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.ProfileDto;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.ProfileRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapperUtil modelMapperUtil;

    @Override
    public ProfileDto getById(Long profileId) {
        return modelMapperUtil.mapEntryTo(userRepository.getById(profileId).getProfile(),new ProfileDto());
    }

    @Override
    public ProfileDto createUserProfile(User user, ProfileDto profileDto) {
        profileDto.setUser(user);
        profileRepository.save(modelMapperUtil.mapEntryTo(profileDto,new Profile()));
        return profileDto;
    }
}
