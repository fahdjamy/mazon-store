package miu.edu.waa.backend.service;

import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.domain.ShoppingCart;
import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.dto.UserDTO;
import miu.edu.waa.backend.dto.UserReqDTO;
import miu.edu.waa.backend.email.EmailService;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.repository.UserRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class UserServiceImpl implements UserService, UserDetailsService {
    private EmailService emailService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private ModelMapperUtil modelMapperUtil;

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAll() {
        return modelMapperUtil.mapEntriesToList(
                userRepository.findAll(),
                new UserDTO()
        );
    }

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == Role.BUYER) {
            ShoppingCart cart = new ShoppingCart();
            cart.setBuyer(user);
            user.setCart(cart);
        }
        return userRepository.save(user);
    }

    public boolean deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElse(null);
        if (user == null) {
            return false;
        }
        userRepository.deleteById(userId);
        return true;
    }

    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElse(null);
        if (user == null) {
            return null;
        }
        return modelMapperUtil.mapEntryTo(
                user,
                new UserDTO()
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public boolean approveSeller(Long sellerId) throws CustomException {
        User seller = userRepository.findUserByIdAndRoleEquals(sellerId, Role.SELLER);
        if (seller == null) {
            throw new CustomException("Seller with id '" + sellerId + " does not exist");
        }
        seller.setIsApproved(true);
        userRepository.save(seller);
        String sellerName = seller.getFirstName().concat(" ").concat(seller.getLastName());
        emailService.send(seller.getEmail(), emailService.buildEmail(sellerName));

        return true;
    }

    public UserDTO createUser(UserReqDTO userDto) throws CustomException {
        if (userRepository.findByUsername(userDto.getUsername()) != null) {
            throw new CustomException("username already exists.");
        }
        User user = modelMapperUtil.mapEntryTo(userDto, new User());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == Role.BUYER) {
            ShoppingCart cart = new ShoppingCart();
            cart.setBuyer(user);
            user.setCart(cart);
        }
        userRepository.save(user);

        return modelMapperUtil.mapEntryTo(user, new UserDTO());
    }

    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }
        userRepository.save(user);
        return userDTO;
    }

    @Override
    public UserDTO getLoggedInUserDetails(
            org.springframework.security.core.userdetails.User loggedInUser) {
        User user = userRepository.findByUsername(loggedInUser.getUsername());
        return modelMapperUtil.mapEntryTo(
                user,
                new UserDTO()
        );
    }

    @Override
    public List<UserDTO> getUsersByRole(
            String role,
            org.springframework.security.core.userdetails.User loggedInUser
    ) {
        User lgUsr = userRepository.findByUsername(loggedInUser.getUsername());
        List<User> usersByRole = userRepository.findUserByRole(Role.valueOf(role));
        if (Role.valueOf(role) == Role.SELLER && lgUsr.getRole() == Role.BUYER) {
            usersByRole.forEach(user -> {
                user.getFollowers().forEach(
                        follow -> {
                            if (follow.getBuyer().getId().equals(lgUsr.getId())) {
                                user.setIsFollowed(true);
                            }
                        }
                );
            });
        }

        return modelMapperUtil.mapEntriesToList(
                usersByRole,
                new UserDTO()
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User loggedUser = userRepository.findByUsername(username);
        if (loggedUser == null) {
            throw new UsernameNotFoundException("Invalid login credentials");
        }
        return new org.springframework.security.core.userdetails.User(
                loggedUser.getUsername(),
                loggedUser.getPassword(),
                loggedUser.getAuthorities()
        );
    }
}
