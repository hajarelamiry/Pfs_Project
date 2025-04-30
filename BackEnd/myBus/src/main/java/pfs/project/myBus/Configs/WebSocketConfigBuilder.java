package pfs.project.myBus.Configs;

public class WebSocketConfigBuilder {
    private PositionHandler positionHandler;

    public WebSocketConfigBuilder setPositionHandler(PositionHandler positionHandler) {
        this.positionHandler = positionHandler;
        return this;
    }

    public WebSocketConfig createWebSocketConfig() {
        return new WebSocketConfig(positionHandler);
    }
}