package pfs.project.myBus.Dto;
import java.util.List;

public class StationDto {

    private Long id;
    private String name;
    private PositionGpsDto positionActuelle;
    private List<Long> busIds; // IDs des bus associés à cette station

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PositionGpsDto getPositionActuelle() {
        return positionActuelle;
    }

    public void setPositionActuelle(PositionGpsDto positionActuelle) {
        this.positionActuelle = positionActuelle;
    }

    public List<Long> getBusIds() {
        return busIds;
    }

    public void setBusIds(List<Long> busIds) {
        this.busIds = busIds;
    }
}

