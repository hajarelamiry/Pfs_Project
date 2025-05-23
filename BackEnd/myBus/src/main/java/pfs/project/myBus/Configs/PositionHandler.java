package pfs.project.myBus.Configs;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import pfs.project.myBus.Dto.PositionGpsDto;
import pfs.project.myBus.Services.DriverService;

@Component
public class PositionHandler extends TextWebSocketHandler {

    private final DriverService driverService;
    private final ObjectMapper objectMapper;

    public PositionHandler(DriverService driverService) {
        this.driverService = driverService;
        this.objectMapper = new ObjectMapper(); // pour transformer json to dto
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Message recu: " + payload);

        try {
            PositionGpsDto positionDto = objectMapper.readValue(payload, PositionGpsDto.class);
            Long driverId = 23L;
            driverService.updateDriverPosition(driverId, positionDto);
            session.sendMessage(new TextMessage("Position enregistree"));
        } catch (Exception e) {
            System.err.println(" Erreur traitement message: " + e.getMessage());
            session.sendMessage(new TextMessage(" Erreur de traitement : " + e.getMessage()));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Connexion WebSocket fermée: " + session.getId());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String username = (String) session.getAttributes().get("username");
        String token = (String) session.getAttributes().get("token");
        System.out.println(" Connexion WebSocket de : " + username + " avec token : " + token);
    }
}
