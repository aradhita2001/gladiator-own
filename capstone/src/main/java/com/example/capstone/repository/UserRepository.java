package com.example.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.capstone.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUserId(long userId); 
    void deleteByUserId(long userId); 
    Optional<User> findByEmail(String email);
    
    // @Query("Select u.name from User u where u.userId = :userId")
    // String getNameById(long userId);
}
