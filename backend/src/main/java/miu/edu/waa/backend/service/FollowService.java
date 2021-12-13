package miu.edu.waa.backend.service;

import miu.edu.waa.backend.exception.CustomException;
import org.springframework.security.core.userdetails.User;

public interface FollowService {
    void unfollow(User loggedInBuyer, Long id) throws CustomException;
    void follow(User follower, long followeeId) throws CustomException;
}
