package com.example.myapp.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Driver extends User {
    private String phoneNumber;

    public Driver() {
        this.setRole("DRIVER"); // Default role for drivers
    }
}