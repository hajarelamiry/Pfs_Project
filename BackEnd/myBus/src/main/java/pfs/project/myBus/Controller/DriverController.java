import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Services.DriverService;

@RestController
@RequestMapping("/api/driver")
@CrossOrigin(origins = "*")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("/{id}/update-position")
    public ResponseEntity<String> updatePosition(
            @PathVariable("id") Long driverId,
            @RequestBody PositionGpsDto positionDto
    ) {
        try {
            driverService.updateDriverPosition(driverId, positionDto);
            return ResponseEntity.ok("Position Updated");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Update failed : " + e.getMessage());
        }
    }
}