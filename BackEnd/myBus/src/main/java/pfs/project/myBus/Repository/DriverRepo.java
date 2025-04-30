package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Dto.DriverDto;
import pfs.project.myBus.Entity.Bus;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import pfs.project.myBus.Entity.Client;
import pfs.project.myBus.Entity.Driver;
import java.util.List;

@Repository
public interface DriverRepo extends JpaRepository<Driver, Long> {
    @Query("SELECT d FROM Driver d WHERE d.bus IS NULL")
    List<Driver> findUnassignedDrivers();
    @Query("SELECT COUNT(d) > 0 FROM Driver d WHERE d.email = ?1")
    Boolean findByEmail(String email);
}
