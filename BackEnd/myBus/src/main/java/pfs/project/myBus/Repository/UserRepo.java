package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfs.project.myBus.Entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
}
