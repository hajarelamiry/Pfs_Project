package pfs.project.myBus.Entity;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String passwordHash;
}