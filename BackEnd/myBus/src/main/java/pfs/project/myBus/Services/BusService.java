package pfs.project.myBus.Services;

import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Driver;

import java.util.List;
import java.util.Optional;

public interface BusService {
    Bus createBus(BusDto dto);
    List<BusType> getAllBusTypes();
    List<Driver> getAllDrivers();
    List<Bus> getAllBuses();
    void DeleteBus(Long id);
    Bus updateBus(Long id, Bus updatedBus);
    Optional<Bus> getBusById(Long id);
}
