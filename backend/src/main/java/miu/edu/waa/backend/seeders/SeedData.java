package miu.edu.waa.backend.seeders;

import miu.edu.waa.backend.domain.Product;
import miu.edu.waa.backend.domain.Role;
import miu.edu.waa.backend.domain.User;
import miu.edu.waa.backend.helpers.ModelMapperUtil;
import miu.edu.waa.backend.service.ProductService;
import miu.edu.waa.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@Transactional(propagation = Propagation.REQUIRED)
public class SeedData {
    private UserService userService;
    private ProductService productService;
    private ModelMapperUtil modelMapperUtil;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    @Autowired
    public void setModelMapperUtil(ModelMapperUtil modelMapperUtil) {
        this.modelMapperUtil = modelMapperUtil;
    }

    public void loadUsers() {
        List<Role> usernameRoles = new ArrayList<>() {{
            add(Role.ADMIN);
            add(Role.BUYER);
            add(Role.SELLER);
        }};

        usernameRoles.forEach(role -> {
            User user = new User();

            user.setRole(role);
            user.setPassword("1234");
            user.setUsername(role.toString().toLowerCase());
            user.setLastName(role.toString().toUpperCase());
            user.setFirstName(role.toString().toUpperCase());
            user.setEmail(role.toString().toLowerCase() + "@mail.com");

            user = userService.createUser(user);
            if (role == Role.SELLER) {
                loadSellerProducts(user);
            }
        });
    }

    public void loadSellerProducts(User seller) {
        List<String> pdtNames = new ArrayList<>(){{
           add("Shoes");
           add("Jacket");
           add("Winter boots");
           add("Jeep wrangler");
        }};
        pdtNames.forEach(pdtName -> {
            Product product = new Product();

            product.setPrice(1000);
            product.setName(pdtName);
            product.setSeller(seller);
            product.setImageCover("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80");
            product.setDescription(pdtName + " is the best product");
            productService.createProduct(product);
        });
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        loadUsers();
    }
}
