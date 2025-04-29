package pfs.project.myBus.Entity;

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
