package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Entity.BusType;

import java.util.Optional;

@Repository
public interface BusTypeRepo extends JpaRepository<BusType, Long> {
}
