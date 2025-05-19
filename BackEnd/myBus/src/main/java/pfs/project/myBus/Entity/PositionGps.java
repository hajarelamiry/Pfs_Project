package pfs.project.myBus.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PositionGps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double lat;
    private double lng;

    private LocalDateTime timestamp;


    public PositionGps() {}

    public PositionGps(double lat, double lng, LocalDateTime timestamp) {
        this.lat = lat;
        this.lng = lng;
        this.timestamp = timestamp;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
