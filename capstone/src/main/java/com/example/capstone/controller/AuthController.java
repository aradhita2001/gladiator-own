package com.example.capstone.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.capstone.dto.LoginRequest;
import com.example.capstone.dto.LoginResponse;
import com.example.capstone.entity.User;
import com.example.capstone.exception.UserNameNotFoundException;
import com.example.capstone.jwt.JwtUtil;
import com.example.capstone.service.UserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/sign-up")
    public ResponseEntity addNewUser(@RequestBody User user) {
        userService.addUser(user);
        
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            User user = userService.getUserByUserEmail(loginRequest.getUsername());
            String role = user.getRole();
            long userId = user.getUserId();
            LoginResponse loginResponse = new LoginResponse(jwtUtil.generateToken(loginRequest.getUsername()), role, userId);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } else {
            throw new UserNameNotFoundException("invalid user request !");
        }
    }
}
