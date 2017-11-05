package com.akoterle.spring_boot.angular.auth;

import com.akoterle.spring_boot.angular.auth.Credentials;
import com.akoterle.spring_boot.angular.auth.UserDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/auth/session")
public class AuthenticationController {
    @Autowired
    AuthenticationManager authenticationManager;

    @RequestMapping(method = RequestMethod.POST)
    public UserDetailsResponse login(@RequestBody Credentials credentials, HttpSession httpSession) {

        final Authentication authenticationToken = new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword());
        final Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final List<String> grantedAuthorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return UserDetailsResponse.of(credentials.getUsername(), grantedAuthorities, true);
    }

    @RequestMapping(method = RequestMethod.GET)
    public UserDetailsResponse session(@AuthenticationPrincipal Principal principal) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getClass().isAssignableFrom(AnonymousAuthenticationToken.class)) {
            return UserDetailsResponse.of("Anonymous", Collections.emptyList(), false);
        }
        final List<String> grantedAuthorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return UserDetailsResponse.of(principal.getName(), grantedAuthorities, authentication.isAuthenticated());
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

}
