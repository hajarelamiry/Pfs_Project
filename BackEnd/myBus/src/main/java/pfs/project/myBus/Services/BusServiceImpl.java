package pfs.project.myBus.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Dto.DriverDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Repository.BusRepo;
import pfs.project.myBus.Repository.BusTypeRepo;
import pfs.project.myBus.Repository.DriverRepo;

import java.util.List;

@Service
public class BusServiceImpl implements BusService{
    private final BusRepo busRepository;
    private final DriverRepo driverRepository;
    private final BusTypeRepo busTypeRepository;

    public BusServiceImpl(BusRepo busRepository, DriverRepo driverRepository, BusTypeRepo busTypeRepository) {
        this.busRepository = busRepository;
        this.driverRepository = driverRepository;
        this.busTypeRepository = busTypeRepository;
    }

    public Bus createBus(BusDto dto) {
        if(!(busRepository.existsByDriverId(dto.getDriverId()))) {
            BusType busType = busTypeRepository.findById(dto.getBusTypeId())
                    .orElseThrow(() -> new RuntimeException("Bus type not found"));

            Driver driver = driverRepository.findById(dto.getDriverId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));

            Bus bus = new Bus();
            bus.setCapacity(dto.getCapacity());
            bus.setCharging(dto.isCharging());
            bus.setSecurity(dto.isSecurity());
            bus.setStatut(dto.getStatus());
            bus.setWifi(dto.isWifi());
            bus.setBusType(busType);
            bus.setDriver(driver);
            return busRepository.save(bus);
        }else {
            throw new IllegalArgumentException("Ce chauffeur est deja assigne a un autre bus.");
        }
    }

    public List<BusType> getAllBusTypes() {
        return busTypeRepository.findAll();
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }
}
