package miu.edu.waa.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;


/**
    1. The prePostEnabled property enables Spring Security pre- / post-annotations.
    2. The securedEnabled property determines if the @Secured annotation should be enabled.
    3. The jsr250Enabled property allows us to use the @RoleAllowed annotation.
 */
@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true
)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
}
