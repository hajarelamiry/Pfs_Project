package pfs.project.myBus.Configs;

import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final PositionHandler positionHandler;
    private final AuthHandshakeInterceptor authInterceptor;

    public WebSocketConfig(PositionHandler positionHandler, AuthHandshakeInterceptor authInterceptor) {
        this.positionHandler = positionHandler;
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
                .addHandler(positionHandler, "/ws/position")
                .addInterceptors(authInterceptor)
                .setAllowedOrigins("*"); // autorise toutes les origines
    }
}
