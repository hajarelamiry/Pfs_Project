package pfs.project.myBus.Entity;

import jakarta.persistence.*;
import pfs.project.myBus.Dto.BusDto;

@Entity
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int capacity;
    @OneToOne
    @JoinColumn(name = "bus_type_id", nullable = true)
    private BusType busType;
    private boolean wifi;
    private boolean charging;
    private boolean security;
    private String statut;
    @OneToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "id",nullable = true)
    private Driver driver;



    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Long getId() {
        return id;
    }

    public BusType getBusType() {
        return busType;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBusType(BusType busType) {
        this.busType = busType;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public int getCapacity() {
        return capacity;
    }

    public boolean isWifi() {
        return wifi;
    }

    public boolean isCharging() {
        return charging;
    }

    public boolean isSecurity() {
        return security;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setWifi(boolean wifi) {
        this.wifi = wifi;
    }

    public void setCharging(boolean charging) {
        this.charging = charging;
    }

    public void setSecurity(boolean security) {
        this.security = security;
    }


}