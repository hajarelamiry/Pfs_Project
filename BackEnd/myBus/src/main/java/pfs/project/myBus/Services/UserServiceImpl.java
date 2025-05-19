package pfs.project.myBus.Services;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pfs.project.myBus.Dto.UserDto;
import pfs.project.myBus.Entity.Bus;
import pfs.project.myBus.Entity.BusType;
import pfs.project.myBus.Entity.Client;
import pfs.project.myBus.Entity.Driver;
import pfs.project.myBus.Entity.LoginRequest;
import pfs.project.myBus.Entity.User;
import pfs.project.myBus.Enums.Role;
import pfs.project.myBus.Repository.BusRepo;
import pfs.project.myBus.Repository.ClientRepo;
import pfs.project.myBus.Repository.DriverRepo;
import pfs.project.myBus.Repository.UserRepo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepo userRepo ;
    private final ClientRepo clientRepo ;
    private final DriverRepo driverRepo ;
    private final BusRepo busRepo ;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public UserServiceImpl(UserRepo userRepo, DriverRepo driverRepo, BusRepo busRepo, ClientRepo clientRepo) {
        this.userRepo = userRepo;
        this.driverRepo = driverRepo;
        this.clientRepo = clientRepo;
        this.busRepo = busRepo;
    }

    public void AddUser(UserDto userDto){
        if(!userRepo.findByEmail(userDto.getEmail()).isPresent()){
            if(userDto.getRole()== Role.ADMIN){
                User user=new User();
                user.setEmail(userDto.getEmail());
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                user.setRole(Role.ADMIN);
                userRepo.save(user);
            }else if(userDto.getRole()==Role.CLIENT){
                User user=new User();
                user.setEmail(userDto.getEmail());
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                user.setRole(Role.CLIENT);
                userRepo.save(user);
            } else if (userDto.getRole()==Role.DRIVER) {
                Driver user=new Driver();
                user.setEmail(userDto.getEmail());
                user.setFirstName(userDto.getFirstName());
                user.setLastName(userDto.getLastName());
                user.setRole(Role.DRIVER);
                user.setPhone(userDto.getPhone());
                driverRepo.save(user);
            }
        }else{
            throw new IllegalArgumentException("Email deja exicte");
        }
    }

    public List<User> allUsers(){
        return userRepo.findAll();
    }

    public User updateUser(Long id, UserDto Updateuser) {
        if (Updateuser.getRole() == Role.ADMIN || Updateuser.getRole() == Role.CLIENT) {
            return userRepo.findById(id).map(user -> {
                user.setEmail(Updateuser.getEmail());
                user.setFirstName(Updateuser.getFirstName());
                user.setLastName(Updateuser.getLastName());
                user.setRole(Updateuser.getRole());
                return userRepo.save(user);
            }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        } else if (Updateuser.getRole() == Role.DRIVER) {
            return driverRepo.findById(id).map(driver -> {
                driver.setEmail(Updateuser.getEmail());
                driver.setFirstName(Updateuser.getFirstName());
                driver.setLastName(Updateuser.getLastName());
                driver.setRole(Updateuser.getRole());
                driver.setPhone(Updateuser.getPhone());
                return driverRepo.save(driver);
            }).orElseThrow(() -> new RuntimeException("Driver not found with ID: " + id));
        } else {
            throw new IllegalArgumentException("Invalid role: " + Updateuser.getRole());
        }
    }

    public void DeleteUser(Long id) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getRole() == Role.ADMIN || user.getRole() == Role.CLIENT) {
                userRepo.delete(user);
            }else if (user instanceof Driver) {
                    Driver driver = (Driver) user;
                    if (driver.getBus() != null) {
                        Bus bus = driver.getBus();
                        bus.setDriver(null);
                        busRepo.save(bus);
                    }
                    driverRepo.delete(driver);
            }

        } else {
            throw new EntityNotFoundException("User with ID " + id + " not found.");
        }
    }

    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }



    public ResponseEntity<?> registerClient(Client client) {
        if (userRepo.findByEmail(client.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Email already exists");
        }
        client.setPasswordHash(passwordEncoder.encode(client.getPasswordHash()));
        clientRepo.save(client);
        return ResponseEntity.ok("Client registered successfully");
    }

    public ResponseEntity<?> registerDriver(Driver driver) {
        driver.setPasswordHash(passwordEncoder.encode(driver.getPasswordHash()));
        driverRepo.save(driver);
        return ResponseEntity.ok("Driver registered successfully");
    }




    public ResponseEntity<?> login(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepo.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPasswordHash(), user.getPasswordHash())) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", "dummy-token"); // or your real token
                response.put("role", user.getRole().name()); // returns "CLIENT", "DRIVER", or "ADMIN"
                response.put("email", user.getEmail());
                return ResponseEntity.ok(response); // <-- return the map, not a string!
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

}
