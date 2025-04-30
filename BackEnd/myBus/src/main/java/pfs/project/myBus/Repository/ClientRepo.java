package pfs.project.myBus.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import pfs.project.myBus.Entity.Client;
import pfs.project.myBus.Entity.Driver;
import java.util.List;
@Repository
public interface ClientRepo extends JpaRepository<Client,Long> {
    @Query("SELECT COUNT(c) > 0 FROM Client c WHERE c.email = ?1")
    Boolean findByEmail(String email);
}
