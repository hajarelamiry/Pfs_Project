package pfs.project.myBus.Entity;

import jakarta.persistence.Entity;
import pfs.project.myBus.Enums.Role;

@Entity
public class Admin extends User{
    public Admin() {
        this.setRole(Role.ADMIN); // Default role for admins
    }
}
