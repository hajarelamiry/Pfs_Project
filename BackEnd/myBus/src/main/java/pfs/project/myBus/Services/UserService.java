package pfs.project.myBus.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pfs.project.myBus.Dto.UserDto;
import pfs.project.myBus.Entity.LoginRequest;
import pfs.project.myBus.Entity.User;
import pfs.project.myBus.Entity.Client;
import pfs.project.myBus.Entity.Driver;

import java.util.List;
import java.util.Optional;


public interface UserService {
    List<User> allUsers();
    void AddUser(UserDto userDto);
    User updateUser(Long id, UserDto Updateuser);
    void DeleteUser(Long id);
    Optional<User> getUserById(Long id);
    ResponseEntity<?> login(LoginRequest loginRequest);
    ResponseEntity<?> registerClient(Client client);
    ResponseEntity<?> registerDriver(Driver driver);
}
