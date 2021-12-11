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
        List<String> usernames = new ArrayList<>() {{
            add("admin");
            add("buyer");
            add("seller");
        }};

        usernames.forEach(username -> {
            UserRegDTO userRegDTO = new UserRegDTO();

            userRegDTO.setPassword("1234");
            userRegDTO.setUsername(username);
            userRegDTO.setEmail(username + "@mail.com");
            userRegDTO.setLastName(username.toLowerCase());
            userRegDTO.setRole(Role.valueOf(username.toLowerCase()));

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
