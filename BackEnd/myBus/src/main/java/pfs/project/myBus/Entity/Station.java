package pfs.project.myBus.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Station {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private String name;
   private int ordre;

   @OneToOne(cascade = CascadeType.ALL)
   @JoinColumn(name = "position_id", referencedColumnName = "id")
   private PositionGps positionActuelle;

   @ManyToMany(mappedBy = "stations")
   private List<Bus> buses;


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
