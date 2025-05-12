package pfs.project.myBus.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pfs.project.myBus.Dto.BusTypeDto;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Dto.StationDto;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.PositionGps;
import pfs.project.myBus.Entity.Station;
import pfs.project.myBus.Repository.BusTypeRepo;
import pfs.project.myBus.Repository.StationRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IBusTypeServiceImp implements IBusTypeService{
    @Autowired
    private BusTypeRepo busTypeRepository;

    @Autowired
    private IStationServiceImp stationService;

    @Autowired
    private StationRepo stationRepository;
    @Transactional
    @Override
    public List<BusTypeDto> getAllBusTypes() {
        return busTypeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BusTypeDto createBusType(BusTypeDto dto) {
        BusType busType = new BusType();
        busType.setName(dto.getName());
        busType.setFirstStation(dto.getFirstStation());
        busType.setLastStation(dto.getLastStation());

        List<Station> stationEntities = dto.getStations().stream().map(stationDto -> {
            Optional<Station> existingStation = stationRepository.findByName(stationDto.getName());
            Station station = existingStation.orElseGet(() -> {
                Station newStation = new Station();
                newStation.setName(stationDto.getName());
                if (newStation.getPositionActuelle() == null) {
                    newStation.setPositionActuelle(new PositionGps());
                }

                newStation.getPositionActuelle().setLat(stationDto.getPositionActuelle().getLat());
                newStation.getPositionActuelle().setLng(stationDto.getPositionActuelle().getLng());

                return stationRepository.save(newStation);
            });

            return station;
        }).collect(Collectors.toList());
        busType.setStations(stationEntities);
        BusType savedBusType = busTypeRepository.save(busType);
        return convertToDTO(savedBusType);
    }


    @Override
    public BusTypeDto getBusTypeById(Long id) {
        Optional<BusType> busTypeOpt = busTypeRepository.findById(id);
        return busTypeOpt.map(this::convertToDTO).orElse(null);
    }

    @Override
    public void deleteBusType(Long id) {
        busTypeRepository.deleteById(id);
    }

    private BusTypeDto convertToDTO(BusType entity) {
        BusTypeDto dto = new BusTypeDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setFirstStation(entity.getFirstStation());
        dto.setLastStation(entity.getLastStation());

        // Vérifier si les stations ne sont pas nulles avant de les convertir
        if (entity.getStations() != null) {
            List<StationDto> stationDtos = entity.getStations().stream()
                    .map(station -> {
                        StationDto stationDto = new StationDto();
                        stationDto.setId(station.getId());
                        stationDto.setName(station.getName());
                        // PositionGpsDto conversion (si nécessaire)
                        if (station.getPositionActuelle() != null) {
                            PositionGpsDto posDto = new PositionGpsDto();
                            posDto.setLat(station.getPositionActuelle().getLat());
                            posDto.setLng(station.getPositionActuelle().getLng());
                            stationDto.setPositionActuelle(posDto);
                        }
                        return stationDto;
                    })
                    .collect(Collectors.toList());

            dto.setStations(stationDtos);
        }

        return dto;
    }
}
