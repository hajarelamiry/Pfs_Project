package pfs.project.myBus.Services;

import jakarta.persistence.EntityNotFoundException;
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
import java.util.Optional;

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

    public boolean UpdateBud(Long id, BusDto busDto){
        Optional<Bus> optionalBus=busRepository.findById(id);
        if(optionalBus.isPresent()){
            Bus exictingBus=optionalBus.get();

            exictingBus.setCapacity(busDto.getCapacity());
            exictingBus.setCharging(busDto.isCharging());
            exictingBus.setSecurity(busDto.isSecurity()); // Correction
            exictingBus.setStatut(busDto.getStatus());
            exictingBus.setWifi(busDto.isWifi());
            Driver driver = driverRepository.findById(busDto.getDriverId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
            BusType busType = busTypeRepository.findById(busDto.getBusTypeId())
                    .orElseThrow(() -> new RuntimeException("BusType not found"));
            exictingBus.setDriver(driver);
            exictingBus.setBusType(busType);
            busRepository.save(exictingBus);
            return true;
        }else{
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
            if (updatedBus.getDriver() != null) {
                Driver driver = driverRepository.findById(updatedBus.getDriver().getId())
                        .orElseThrow(() -> new RuntimeException("Driver not found"));
                bus.setDriver(driver);
            }

            if (updatedBus.getBusType() != null) {
                BusType busType = busTypeRepository.findById(updatedBus.getBusType().getId())
                        .orElseThrow(() -> new RuntimeException("BusType not found"));
                bus.setBusType(busType);
            }

            return busRepository.save(bus);
        }).orElseThrow(() -> new RuntimeException("Bus not found with ID: " + id));
    }


}

