package pfs.project.myBus.Entity;
import jakarta.persistence.Entity;
import pfs.project.myBus.Enums.Role;

@Entity
public class Client extends User{
    public Client() {
        this.setRole(Role.CLIENT); // Default role for clients
    }
}
