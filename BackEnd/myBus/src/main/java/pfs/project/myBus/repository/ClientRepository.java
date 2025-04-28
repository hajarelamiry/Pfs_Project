package pfs.project.myBus.repository;

import pfs.project.myBus.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}