package pfs.project.myBus.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Station {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(unique = true)
   private String name;

   private int ordre;

   @OneToOne(cascade = CascadeType.ALL)
   @JoinColumn(name = "position_id", referencedColumnName = "id")
   private PositionGps positionActuelle;

   @ManyToMany
   @JoinTable(
           name = "station_bus",  // Table d'association
           joinColumns = @JoinColumn(name = "station_id"),  // Clé étrangère pour Station
           inverseJoinColumns = @JoinColumn(name = "bus_id")  // Clé étrangère pour Bus
   )
   private List<Bus> buses;


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

   public int getOrdre() {
      return ordre;
   }

   public void setOrdre(int ordre) {
      this.ordre = ordre;
   }

   public PositionGps getPositionActuelle() {
      return positionActuelle;
   }

   public void setPositionActuelle(PositionGps positionActuelle) {
      this.positionActuelle = positionActuelle;
   }

   public List<Bus> getBuses() {
      return buses;
   }

   public void setBuses(List<Bus> buses) {
      this.buses = buses;
   }
}
