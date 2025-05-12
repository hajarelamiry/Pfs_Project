package pfs.project.myBus.Controller.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfs.project.myBus.Dto.BusTypeDto;
import pfs.project.myBus.Services.IBusTypeServiceImp;

import java.util.List;

@RestController
@RequestMapping("/api/bustypes")
public class BusTypeController {

    private final IBusTypeServiceImp busTypeService;

    @Autowired
    public BusTypeController(IBusTypeServiceImp busTypeService) {
        this.busTypeService = busTypeService;
    }


    @GetMapping
    public ResponseEntity<List<BusTypeDto>> getAllBusTypes() {
        List<BusTypeDto> list = busTypeService.getAllBusTypes();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/{id}")
    public ResponseEntity<BusTypeDto> getBusTypeById(@PathVariable Long id) {
        BusTypeDto dto = busTypeService.getBusTypeById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<BusTypeDto> createBusType(@RequestBody BusTypeDto dto) {
        BusTypeDto created = busTypeService.createBusType(dto);
        return ResponseEntity.ok(created);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusType(@PathVariable Long id) {
        busTypeService.deleteBusType(id);
        return ResponseEntity.noContent().build();
    }
}

