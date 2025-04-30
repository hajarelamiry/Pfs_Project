package pfs.project.myBus.Services;

import org.springframework.stereotype.Service;
import pfs.project.myBus.Dto.UserDto;
import pfs.project.myBus.Entity.User;

import java.util.List;
import java.util.Optional;


public interface UserService {
    List<User> allUsers();
    void AddUser(UserDto userDto);
    User updateUser(Long id, UserDto Updateuser);
    void DeleteUser(Long id);
    Optional<User> getUserById(Long id);
}
