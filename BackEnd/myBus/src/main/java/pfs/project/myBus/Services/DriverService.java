package pfs.project.myBus.Services;

import org.springframework.stereotype.Service;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Entity.PositionGps;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Repository.DriverRepo;
import pfs.project.myBus.Repository.PositionGpsRepository;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Service
public class DriverService {
    private final DriverRepo driverRepository;
    private final PositionGpsRepository positionGpsRepository;

    public DriverService(DriverRepo driverRepository, PositionGpsRepository positionGpsRepository) {
        this.driverRepository = driverRepository;
        this.positionGpsRepository = positionGpsRepository;
    }

    public void updateDriverPosition(Long driverId, PositionGpsDto positionDto) throws Exception {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new Exception("Driver Unfound"));

        PositionGps position = driver.getPositionGps();

        if (position == null) {

            position = new PositionGps();
            position.setLat(positionDto.getLat());
            position.setLng(positionDto.getLng());

            OffsetDateTime offsetDateTime = OffsetDateTime.parse(positionDto.getTimestamp());
            LocalDateTime timestamp = offsetDateTime.toLocalDateTime();
            position.setTimestamp(timestamp);

            positionGpsRepository.save(position);
            driver.setPositionGps(position);

        } else {

            position.setLat(positionDto.getLat());
            position.setLng(positionDto.getLng());

            OffsetDateTime offsetDateTime = OffsetDateTime.parse(positionDto.getTimestamp());
            LocalDateTime timestamp = offsetDateTime.toLocalDateTime();
            position.setTimestamp(timestamp);

        }



        driverRepository.save(driver);
    }
}
