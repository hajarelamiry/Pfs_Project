package pfs.project.myBus.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PositionGpsDto {
    private Long id;
    private double lat;
    private double lng;
    private String timestamp;
}
