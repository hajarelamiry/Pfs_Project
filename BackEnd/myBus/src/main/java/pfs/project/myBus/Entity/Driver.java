package pfs.project.myBus.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Driver extends User {

    private String phone;

    @OneToOne(mappedBy = "driver")
    @JsonIgnore
    private Bus bus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "position_id", referencedColumnName = "id")
    private PositionGps positionActuelle;


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public PositionGps getPositionGps() {
        return positionActuelle;
    }

    public void setPositionGps(PositionGps positionActuelle) {
        this.positionActuelle = positionActuelle;
    }
}
