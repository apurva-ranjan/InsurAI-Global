package com.insurai.backend.controller;

import com.insurai.backend.model.User;
import com.insurai.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Force default role if missing
            if (user.getRole() == null) user.setRole("USER");
            
            User savedUser = userRepository.save(user);
            System.out.println("SUCCESS: User saved with ID: " + savedUser.getId());
            
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("ERROR: Registration failed: " + e.getMessage());
            return ResponseEntity.status(500).body("Registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByEmail(loginData.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginData.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("user", user.get());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}