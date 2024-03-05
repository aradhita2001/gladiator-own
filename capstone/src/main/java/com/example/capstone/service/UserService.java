package com.example.capstone.service;

import java.util.List;

import com.example.capstone.entity.User;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(long userId);
    User getUserByUserEmail(String email);
    User addUser(User user);
    void updateUser(long userId, User user);
    void deleteUser(long userId);
}
