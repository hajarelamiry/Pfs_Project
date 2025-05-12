package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.Driver;
import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepo extends JpaRepository<Bus, Long> {
    boolean existsByDriverId(long driver);
    List<Bus> findByStations_NameContainingIgnoreCase(String name);
}
