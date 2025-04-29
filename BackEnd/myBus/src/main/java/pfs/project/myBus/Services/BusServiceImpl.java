package pfs.project.myBus.Services;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Repository.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BusServiceImpl implements BusService{
    private final BusRepo busRepository;
    private final DriverRepo driverRepository;
    private final ClientRepo clientRepo;
    private final BusTypeRepo busTypeRepository;
    private final UserRepo userRepo;
    public BusServiceImpl(BusRepo busRepository, DriverRepo driverRepository, ClientRepo clientRepo, BusTypeRepo busTypeRepository, UserRepo userRepo) {
        this.busRepository = busRepository;
        this.driverRepository = driverRepository;
        this.clientRepo = clientRepo;
        this.busTypeRepository = busTypeRepository;
        this.userRepo = userRepo;
    }
    public Bus createBus(BusDto dto) {
        if (dto.getDriverId() != null && busRepository.existsByDriverId(dto.getDriverId())) {
            throw new IllegalArgumentException("Ce chauffeur est deja assigne a un autre bus.");
        }

        BusType busType = busTypeRepository.findById(dto.getBusTypeId())
                .orElseThrow(() -> new RuntimeException("Bus type not found"));

        Driver driver = null;
        if (dto.getDriverId() != null) {
            driver = driverRepository.findById(dto.getDriverId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
        }

        Bus bus = new Bus();
        bus.setCapacity(dto.getCapacity());
        bus.setCharging(dto.isCharging());
        bus.setSecurity(dto.isSecurity());
        bus.setStatut(dto.getStatus());
        bus.setWifi(dto.isWifi());
        bus.setBusType(busType);
        bus.setDriver(driver); // Peut être null

        return busRepository.save(bus);
    }

    public List<BusType> getAllBusTypes() {
        return busTypeRepository.findAll();
    }
    public List<Bus> getAllBuses(){

        return busRepository.findAll();
    }
    public void DeleteBus(Long id) {
        Optional<Bus> busOpt = busRepository.findById(id);

        if (busOpt.isPresent()) {
            Bus bus = busOpt.get();
            bus.setDriver(null);
            bus.setBusType(null);
            busRepository.save(bus);
            busRepository.delete(bus);
        } else {
            throw new EntityNotFoundException("Bus with ID " + id + " not found.");
        }
    }
    public boolean UpdateBud(Long id, BusDto busDto) {
        Optional<Bus> optionalBus = busRepository.findById(id);
        if (optionalBus.isPresent()) {
            Bus existingBus = optionalBus.get();

            existingBus.setCapacity(busDto.getCapacity());
            existingBus.setCharging(busDto.isCharging());
            existingBus.setSecurity(busDto.isSecurity());
            existingBus.setStatut(busDto.getStatus());
            existingBus.setWifi(busDto.isWifi());

            // Gestion de Driver nullable
            Driver driver = null;
            if (busDto.getDriverId() != null) {
                driver = driverRepository.findById(busDto.getDriverId())
                        .orElseThrow(() -> new RuntimeException("Driver not found"));
            }
            existingBus.setDriver(driver);

            // Gestion du BusType obligatoire
            BusType busType = busTypeRepository.findById(busDto.getBusTypeId())
                    .orElseThrow(() -> new RuntimeException("BusType not found"));
            existingBus.setBusType(busType);

            busRepository.save(existingBus);
            return true;
        } else {
            return false;
        }
    }

    public Optional<Bus> getBusById(Long id) {
        return busRepository.findById(id);
    }

    public Bus updateBus(Long id, Bus updatedBus) {
        return busRepository.findById(id).map(bus -> {
            bus.setCapacity(updatedBus.getCapacity());
            bus.setCharging(updatedBus.isCharging());
            bus.setSecurity(updatedBus.isSecurity());
            bus.setStatut(updatedBus.getStatut());
            bus.setWifi(updatedBus.isWifi());
            Driver driver = driverRepository.findById(updatedBus.getDriver().getId())
                        .orElseThrow(() -> new RuntimeException("Driver not found"));
            bus.setDriver(driver);
            if (updatedBus.getBusType() != null) {
                BusType busType = busTypeRepository.findById(updatedBus.getBusType().getId())
                        .orElseThrow(() -> new RuntimeException("BusType not found"));
                bus.setBusType(busType);
            }
            return busRepository.save(bus);
        }).orElseThrow(() -> new RuntimeException("Bus not found with ID: " + id));
    }
    public Map<String, Long> getCounts() {
        long busCount = busRepository.count();
        long driverCount = driverRepository.count();

        Map<String, Long> counts = new HashMap<>();
        counts.put("busCount", busCount);
        counts.put("driverCount", driverCount);

        return counts;
    }



}

