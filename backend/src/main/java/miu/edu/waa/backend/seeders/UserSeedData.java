package miu.edu.waa.backend.seeders;

import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.dto.UserRegDTO;
import miu.edu.waa.backend.exception.CustomException;
import miu.edu.waa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserSeedData {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void loadUsers() {
        List<Role> usernameRoles = new ArrayList<>() {{
            add(Role.ADMIN);
            add(Role.BUYER);
            add(Role.SELLER);
        }};

        usernameRoles.forEach(role -> {
            UserRegDTO userRegDTO = new UserRegDTO();

            userRegDTO.setRole(role);
            userRegDTO.setPassword("1234");
            userRegDTO.setUsername(role.toString().toLowerCase());
            userRegDTO.setLastName(role.toString().toUpperCase());
            userRegDTO.setFirstName(role.toString().toUpperCase());
            userRegDTO.setEmail(role.toString().toLowerCase() + "@mail.com");

            try {
                userService.createUser(userRegDTO);
            } catch (CustomException e) {
                e.printStackTrace();
            }
        });
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        loadUsers();
    }
}
