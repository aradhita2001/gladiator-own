package com.example.capstone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.capstone.entity.User;
import com.example.capstone.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(long UserId) {
        return userRepository.findByUserId(UserId);
    }

    @Override
    public User getUserByUserEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    @Override
    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void updateUser(long userId, User user) {
        User oldUser = userRepository.findByUserId(userId);
        oldUser.setName(user.getName());
        oldUser.setPhone(user.getPhone());
        userRepository.save(oldUser);      
    }

    @Override
    public void deleteUser(long UserId) {
        userRepository.deleteById(UserId);
    }
    
}
