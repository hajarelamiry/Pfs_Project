package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.Driver;

import java.util.List;


@Repository
public interface BusRepo extends JpaRepository<Bus, Long> {
    boolean existsByDriverId(long driver);
    Bus findByName(String name);
    List<Bus> findByStations_NameContainingIgnoreCase(String name);
}
