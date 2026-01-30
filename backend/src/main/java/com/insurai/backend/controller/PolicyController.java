package com.insurai.backend.controller;

import com.insurai.backend.model.Policy;
import com.insurai.backend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:3000") // THIS IS THE FIX
public class PolicyController {

    @Autowired
    private PolicyRepository policyRepository;

    @GetMapping
    public List<Policy> getAll() { 
        return policyRepository.findAll(); 
    }

    @PostMapping("/add")
    public Policy add(@RequestBody Policy p) { 
        return policyRepository.save(p); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        policyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}