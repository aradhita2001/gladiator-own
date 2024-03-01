package com.example.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.capstone.entity.User;
import com.example.capstone.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
 
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
 
 
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
 
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
 
    // @GetMapping("/{customerEmail}")
    // public ResponseEntity<Customer> getByCustomerEmail(@PathVariable String customerEmail) {

    //         Customer customers = customerService.getCustomerByCustomerEmail(customerEmail);
    //         if (customers != null) {
    //             return new ResponseEntity<>(customers, HttpStatus.OK);
    //         } else {
    //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //         }
    // }  
 
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> addUser(@RequestBody User users) {
        User user = userService.addUser(users);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable long userId, @RequestBody User user) {
        userService.updateUser(userId, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
 
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

