package com.example.capstone;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
import com.example.capstone.entity.User;
import com.example.capstone.exception.UserAlreadyExistsException;
import com.example.capstone.service.UserService;
 
@SpringBootApplication
public class CapstoneApplication implements CommandLineRunner{
 
    @Autowired
    private UserService userService;
 
    public static void main(String[] args) {
        SpringApplication.run(CapstoneApplication.class, args);
    }
 
    @Override
    public void run(String... args) throws Exception {
        User admin = new User("Aradhita", "aradhita@email.com", "9876543210", "ADMIN", "Pass@1234", null);
        admin.setUserId(1);
        try {
        userService.addUser(admin);
        } catch (UserAlreadyExistsException e) {
            System.out.println("Master Admin already exists");
        }
    }
}
 