package pfs.project.myBus.Services;

import pfs.project.myBus.Dto.StationDto;

import java.util.List;

public interface IStationService {
    List<StationDto> getAllStationsAsDtos();
    StationDto createStation(StationDto dto);
}
