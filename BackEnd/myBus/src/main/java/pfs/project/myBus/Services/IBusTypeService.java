package pfs.project.myBus.Services;

import pfs.project.myBus.Dto.BusTypeDto;

import java.util.List;

public interface IBusTypeService {
    List<BusTypeDto> getAllBusTypes();

    BusTypeDto createBusType(BusTypeDto dto);

    BusTypeDto getBusTypeById(Long id);

    void deleteBusType(Long id);
}
