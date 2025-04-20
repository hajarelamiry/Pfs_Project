package pfs.project.myBus.Configs;

import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final PositionHandler positionHandler;

    // ✅ Ce constructeur manquait
    public WebSocketConfig(PositionHandler positionHandler) {
        this.positionHandler = positionHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(positionHandler, "/ws/position")
                .setAllowedOrigins("*"); // autorise toutes les origines
    }
}
