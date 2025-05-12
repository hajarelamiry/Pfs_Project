package pfs.project.myBus.Services;

import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Entity.Station;
import java.util.List;
import pfs.project.myBus.Dto.UserDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.User;
import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface BusService {
    Bus createBus(BusDto dto);
    List<BusType> getAllBusTypes();
    List<Driver> getAllDrivers();
    List<Bus> getBusesByStationName(String StationName);

    List<Bus> getAllBuses();
    void DeleteBus(Long id);
    Bus updateBus(Long id, Bus updatedBus);
    Optional<Bus> getBusById(Long id);
    Map<String, Long> getCounts();
}
