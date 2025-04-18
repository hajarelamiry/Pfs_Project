package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.Driver;


@Repository
public interface BusRepo extends JpaRepository<Bus, Long> {
    boolean existsByDriverId(long driver);
}
