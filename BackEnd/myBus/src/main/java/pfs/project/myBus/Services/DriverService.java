package pfs.project.myBus.Services;

import org.springframework.stereotype.Service;
import pfs.project.myBus.Entity.Driver;

import java.util.List;


public interface DriverService {
    List<Driver> getAllDrivers();
    List<Driver> getDrivers();
}
