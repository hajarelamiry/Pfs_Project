package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Entity.Client;

@Repository
public interface ClientRepo extends JpaRepository<Client, Long> {
}
