package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.ProfileDto;

public interface FollowService {
    void follow(User follower, long followeeId);

//    void unfollow(ProfileDto follower, ProfileDto followee);
void unfollow(Long id);
}
