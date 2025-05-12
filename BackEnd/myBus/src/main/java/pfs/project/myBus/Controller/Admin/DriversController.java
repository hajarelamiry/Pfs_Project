package pfs.project.myBus.Controller.Admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Services.DriverService;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriversController {
    private final DriverService driverService;

    public DriversController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping("/getDrivers")
    public List<Driver> getDrivers() {
        return driverService.getDrivers();
    }

    @GetMapping("/Alldrivers")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }
}
