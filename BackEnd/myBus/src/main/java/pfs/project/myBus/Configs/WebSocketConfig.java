// WebSocketConfig.java
package pfs.project.myBus.Configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final PositionHandler positionHandler;

    public WebSocketConfig(PositionHandler positionHandler) {
        this.positionHandler = positionHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(positionHandler, "/ws/position")
                .setAllowedOrigins("*"); // accepte toutes les origines (utile pour dev)
    }
}
