package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pfs.project.myBus.Entity.User;

public interface UserRepo extends JpaRepository<User,Long> {
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.email = ?1")
    Boolean findByEmail(String email);
}
