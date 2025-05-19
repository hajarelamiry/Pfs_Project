package pfs.project.myBus.Dto;

import lombok.Data;
public class BusDto {
    private Long id;
    private int capacity;
    private String status;
    private boolean charging;
    private boolean security;
    private boolean wifi;
    private Long busTypeId;
    private Long driverId;

    public String getStatus() {
        return status;
    }

    public void setStatus(String statut) {
        this.status = statut;
    }

    public Long getBusTypeId() {
        return busTypeId;
    }

    public Long getDriverId() {
        return driverId;
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

    public void setBusTypeId(Long busTypeId) {
        this.busTypeId = busTypeId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
