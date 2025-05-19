package pfs.project.myBus.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pfs.project.myBus.Entity.Station;

import java.util.Optional;

@Repository
public interface StationRepo extends JpaRepository<Station,Long> {
    Optional<Station> findByName(String name);
}