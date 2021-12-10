package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Follow;
import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.FollowDto;
import miu.edu.waa.backend.dto.ProfileDto;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.FollowRepository;
import miu.edu.waa.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class FollowServiceImpl implements FollowService {
    @Autowired
    FollowRepository followRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapperUtil modelMapperUtil;

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void follow(User follower, long followeeId) {
        FollowDto follow = new FollowDto(follower.getProfile(),userRepository.findById(followeeId).orElse(null).getProfile());
        followRepository.save(modelMapperUtil.mapEntryTo(follow,new Follow()));
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void unfollow(Long id) {
        followRepository.deleteById(id);
    }
}
