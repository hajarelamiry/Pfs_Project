package pfs.project.myBus.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PositionGpsDto {
    private double lat;
    private double lng;
    private String timestamp;
}
