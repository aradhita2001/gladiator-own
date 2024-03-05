package com.example.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.capstone.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUserId(long userId); 
    Optional<User> findByEmail(String email);
}
