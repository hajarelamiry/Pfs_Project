package pfs.project.myBus.Configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Services.DriverService;

@Component
public class PositionHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final DriverService driverService;

    public PositionHandler(DriverService driverService) {
        this.driverService = driverService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Message reçu: " + payload);


        PositionGpsDto positionDto = objectMapper.readValue(payload, PositionGpsDto.class);
        Long driverId = positionDto.getId();
        driverService.updateDriverPosition(driverId, positionDto);

        session.sendMessage(new TextMessage("Position enregistrée pour le chauffeur " + driverId));

    }}