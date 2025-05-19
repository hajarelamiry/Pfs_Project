package pfs.project.myBus.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class BusType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String firstStation;
    private String lastStation;

    @JsonIgnore
    @OneToMany(mappedBy = "busType", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "busType"})
    private List<Bus> buses;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "bus_station",
            joinColumns = @JoinColumn(name = "bus_id"),
            inverseJoinColumns = @JoinColumn(name = "station_id")
    )
    private List<Station> stations;

    public void setStations(List<Station> stations) {
        this.stations = stations;
    }


    public List<Station> getStations() {
        return stations;
    }

    public List<Bus> getBuses() {
        return buses;
    }

    public void setBuses(List<Bus> buses) {
        this.buses = buses;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFirstStation() {
        return firstStation;
    }

    public String getLastStation() {
        return lastStation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFirstStation(String firstStation) {
        this.firstStation = firstStation;
    }

    public void setLastStation(String lastStation) {
        this.lastStation = lastStation;
    }
}
