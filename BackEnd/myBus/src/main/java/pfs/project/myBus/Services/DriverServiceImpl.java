package pfs.project.myBus.Services;

import org.springframework.stereotype.Service;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Repository.BusRepo;
import pfs.project.myBus.Repository.DriverRepo;

import java.util.List;

@Service
public class DriverServiceImpl {

    private final DriverRepo driverRepository;
    private final BusRepo busRepo;

    public DriverServiceImpl(DriverRepo driverRepository, BusRepo busRepo) {
        this.driverRepository = driverRepository;
        this.busRepo = busRepo;
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }


    public List<Driver> getDrivers() {
        return driverRepository.findUnassignedDrivers();
    }
}
