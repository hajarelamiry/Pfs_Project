package pfs.project.myBus.Services;

import pfs.project.myBus.Dto.BusDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Entity.Station;

import java.util.List;

public interface BusService {
    Bus createBus(BusDto dto);
    List<BusType> getAllBusTypes();
    List<Driver> getAllDrivers();
    public List<Bus> getAllBuses();
    public List<Bus> getBusesByStationName(String StationName);
    public Bus getBusByName(String name);
}
