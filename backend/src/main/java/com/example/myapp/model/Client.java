package com.example.myapp.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Client extends User {
    public Client() {
        this.setRole("CLIENT"); // Default role for clients
    }
}