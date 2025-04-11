package pfs.project.myBus.Entity;

import jakarta.persistence.*;

@Entity
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int capacity;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bus_type_id", nullable = false)
    private BusType busType;
    private boolean wifi;
    private boolean charging;
    private boolean security;
    private String statut;
    @OneToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "id")
    private Driver driver;



    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public int getId() {
        return id;
    }

    public BusType getBusType() {
        return busType;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setId(int id) {
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