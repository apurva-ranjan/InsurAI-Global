package com.insurai.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "policies")
@Data
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Ensure this is present
    private Long id;
    private String policyName;
    private String category;
    private double premium;
    private String coverage;
}