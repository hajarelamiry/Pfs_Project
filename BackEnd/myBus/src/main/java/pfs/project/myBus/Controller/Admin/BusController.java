package pfs.project.myBus.Controller.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Services.BusService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createBus(@RequestBody BusDto dto) {
        try {
            Bus createdBus = busService.createBus(dto);
            return ResponseEntity.ok(createdBus);
        } catch (HttpClientErrorException.Unauthorized ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }

    }

    @GetMapping("/types")
    public List<BusType> getBusTypes() {
        return busService.getAllBusTypes();
    }

    @GetMapping("/drivers")
    public List<Driver> getDrivers() {
        return busService.getAllDrivers();
    }
}