package pfs.project.myBus.repository;

import pfs.project.myBus.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
}