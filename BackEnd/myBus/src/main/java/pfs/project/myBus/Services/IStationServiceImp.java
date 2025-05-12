package pfs.project.myBus.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Dto.StationDto;
import pfs.project.myBus.Entity.PositionGps;
import pfs.project.myBus.Entity.Station;
import pfs.project.myBus.Repository.StationRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IStationServiceImp implements IStationService {

    private final StationRepo stationRepository;

    @Autowired
    public IStationServiceImp(StationRepo stationRepository) {
        this.stationRepository = stationRepository;
    }
    @Transactional
    @Override
    public List<StationDto> getAllStationsAsDtos() {
        return stationRepository.findAll().stream()
                .map(this::convertStationToDto)
                .collect(Collectors.toList());
    }

    private StationDto convertStationToDto(Station station) {
        StationDto dto = new StationDto();
        dto.setId(station.getId());
        dto.setName(station.getName());

        if (station.getPositionActuelle() != null) {
            PositionGpsDto positionDto = new PositionGpsDto();
            positionDto.setId(station.getPositionActuelle().getId());
            positionDto.setLat(station.getPositionActuelle().getLat());
            positionDto.setLng(station.getPositionActuelle().getLng());
            dto.setPositionActuelle(positionDto);
        }

        // Convert Bus list to bus ID list
        List<Long> busIds = station.getBuses().stream()
                .map(bus -> bus.getId()) // for compatibility
                .collect(Collectors.toList());
        dto.setBusIds(busIds);

        return dto;
    }
    @Override
    public StationDto createStation(StationDto dto) {
        Station station = new Station();
        station.setName(dto.getName());

        // Convertir PositionGpsDto en PositionGps
        if (dto.getPositionActuelle() != null) {
            PositionGps position = new PositionGps();
            position.setLat(dto.getPositionActuelle().getLat());
            position.setLng(dto.getPositionActuelle().getLng());
            station.setPositionActuelle(position);
        }


        Station savedStation = stationRepository.save(station);
        return convertStationToDto(savedStation);
    }
}
