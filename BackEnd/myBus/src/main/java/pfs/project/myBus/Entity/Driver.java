package pfs.project.myBus.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Driver extends User{
    private String phone;
    @OneToOne(mappedBy = "driver")
    @JsonIgnore
    private Bus bus;

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
}
