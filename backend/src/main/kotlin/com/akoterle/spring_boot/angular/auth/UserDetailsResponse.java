package com.akoterle.spring_boot.angular.auth;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserDetailsResponse implements Serializable {
    private String userName;
    private List<String> grants;
    private boolean authenticated;


    public static UserDetailsResponse of(String userName, List<String> grants, boolean authenticated) {
        final UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
        userDetailsResponse.userName = userName;
        userDetailsResponse.grants = grants;
        userDetailsResponse.authenticated = authenticated;
        return userDetailsResponse;
    }
}
