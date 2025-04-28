package pfs.project.myBus.controller;

import pfs.project.myBus.model.Client;
import pfs.project.myBus.model.Driver;
import pfs.project.myBus.model.LoginRequest;
import pfs.project.myBus.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup/client")
    public ResponseEntity<?> registerClient(@RequestBody Client client) {
        return userService.registerClient(client);
    }

    @PostMapping("/signup/driver")
    public ResponseEntity<?> registerDriver(@RequestBody Driver driver) {
        return userService.registerDriver(driver);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }
}