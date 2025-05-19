package pfs.project.myBus.Controller.Admin;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import pfs.project.myBus.Dto.UserDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.User;
import pfs.project.myBus.Services.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateBus(@PathVariable Long id, @RequestBody UserDto user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/allUsers")
    public List<User> getUsers() {
        return userService.allUsers();
    }
    // @PostMapping("/addUser")
    // public ResponseEntity<?> createUser(@RequestBody UserDto dto) {
    //     try {
    //         userService.AddUser(dto);
    //         return ResponseEntity.ok("Ok");
    //     } catch (HttpClientErrorException.Unauthorized ex) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
    //     }catch (IllegalArgumentException e) {
    //         return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    //     }

    // }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeleteUsers(@PathVariable Long id){
        try{
            userService.DeleteUser(id);
            return ResponseEntity.ok(null);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<?> getBusById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(bus -> ResponseEntity.ok().body(bus))
                .orElse(ResponseEntity.notFound().build());
    }
}
