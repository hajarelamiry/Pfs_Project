package pfs.project.myBus.Controller.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfs.project.myBus.Dto.StationDto;
import pfs.project.myBus.Services.IStationService;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "*")
public class StationController {

    private final IStationService stationService;

    @Autowired
    public StationController(IStationService stationService) {
        this.stationService = stationService;
    }


    @GetMapping
    public ResponseEntity<List<StationDto>> getAllStations() {
        List<StationDto> stations = stationService.getAllStationsAsDtos();
        return ResponseEntity.ok(stations);
    }


    @PostMapping
    public ResponseEntity<StationDto> createStation(@RequestBody StationDto dto) {
        StationDto created = stationService.createStation(dto);
        return ResponseEntity.ok(created);
    }
}
