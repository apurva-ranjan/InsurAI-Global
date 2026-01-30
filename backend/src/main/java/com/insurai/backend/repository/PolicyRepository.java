package com.insurai.backend.repository;

import com.insurai.backend.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    // Standard CRUD operations are inherited automatically
}