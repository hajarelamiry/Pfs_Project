package pfs.project.myBus.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import pfs.project.myBus.Enums.Role;

import java.util.List;

@Entity
public class Driver extends User{
    private String phone;
    @OneToOne(mappedBy = "driver")
    @JsonIgnore
    private Bus bus;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "position_id", referencedColumnName = "id")
    private PositionGps positionActuelle;
    public Driver(Long id, String firstName, String lastName, String email, Role role, String passwordHash, String phone) {
        super(id,firstName,lastName,email, role, passwordHash);
        this.phone = phone;
    }

    public Driver() {
    }

    public String getPhone() {
        return phone;
    }

    public Bus getBus() {
        return bus;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
