package miu.edu.waa.backend.controller;

import miu.edu.waa.backend.domain.Authentication;
import miu.edu.waa.backend.jwt.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private JWTUtil jwtUtil;
    private UserDetailsService userDetailsService;
    private AuthenticationManager authenticationManager;

    @Autowired
    public void setJwtUtil(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody Authentication authReq) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authReq.getUsername(),
                            authReq.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new Exception("Incorrect login credentials", ex);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(authReq.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);
        Map<String, String> details = jwtUtil.getDecodedTokenDetails(jwt);
        String role = details.get("authorities").split("_")[1].split("}")[0];

        return ResponseEntity.ok(new HashMap<String, Object>(){{
            put("token", jwt);
            put("role", role);
        }});
    }
}
