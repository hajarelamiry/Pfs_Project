package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Dto.DriverDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.Driver;

import java.util.Optional;

@Repository
public interface DriverRepo extends JpaRepository<Driver, Long> {
}
