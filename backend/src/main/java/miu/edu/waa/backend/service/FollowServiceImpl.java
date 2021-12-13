package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Follow;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.repository.UserRepository;
import miu.edu.waa.backend.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class FollowServiceImpl implements FollowService {
    private UserRepository userRepository;
    private FollowRepository followRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setFollowRepository(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void follow(User follower, long followeeId) throws CustomException {
        var seller = userRepository
                .findById(followeeId).orElse(null);
        if (seller == null) {
            throw new CustomException("seller does not exist.");
        }
        miu.edu.waa.backend.domain.User buyer = userRepository
                .findByUsername(follower.getUsername());
        Follow followRecord = followRepository
                .findByBuyerIdAndSellerId(buyer.getId(), followeeId);
        if (followRecord != null) {
            throw new CustomException("you already follow this seller.");
        }
        Follow newFollowRow = new Follow();
        newFollowRow.setBuyer(buyer);
        newFollowRow.setSeller(seller);
        buyer.addFollowing(newFollowRow);
        userRepository.save(buyer);
    }

    @PreAuthorize("hasRole('ROLE_BUYER')")
    public void unfollow(User follower, Long sellerId) throws CustomException {
        miu.edu.waa.backend.domain.User seller = userRepository
                .findById(sellerId).orElse(null);
        if (seller == null) {
            throw new CustomException("seller does not exist.");
        }
        miu.edu.waa.backend.domain.User buyer = userRepository
                .findByUsername(follower.getUsername());
        Follow followRecord = followRepository
                .findByBuyerIdAndSellerId(buyer.getId(), sellerId);
        if (followRecord == null) {
            throw new CustomException("buyer does not follow the seller.");
        }
        followRepository.delete(followRecord);
    }
}
