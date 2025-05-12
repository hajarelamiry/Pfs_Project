package pfs.project.myBus.Controller;
import jakarta.persistence.EntityNotFoundException;
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

    @GetMapping("/allBuses")
    public List<Bus> getBus() {
        return busService.getAllBuses();
    }

    @GetMapping("/drivers")
    public List<Driver> getDrivers() {
        return busService.getAllDrivers();
    }




    @DeleteMapping("/bus/{id}")
    public ResponseEntity<?> DeleteBuses(@PathVariable Long id){
        try{
            busService.DeleteBus(id);
            return ResponseEntity.ok(null);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getBus/{id}")
    public ResponseEntity<?> getBusById(@PathVariable Long id) {
        return busService.getBusById(id)
                .map(bus -> ResponseEntity.ok().body(bus))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable("id") Long id, @RequestBody Bus bus) {
        try {
            Bus updatedBus = busService.updateBus(id, bus);
            return ResponseEntity.ok(updatedBus);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/count")
    public Map<String, Long> getCounts() {
        return busService.getCounts();
    }
}