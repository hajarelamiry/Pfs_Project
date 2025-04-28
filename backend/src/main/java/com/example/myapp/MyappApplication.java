package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyappApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyappApplication.class, args);
    }
}

// package com.example.myapp;

// import com.example.myapp.model.Client;
// import com.example.myapp.model.Driver;
// import com.example.myapp.repository.ClientRepository;
// import com.example.myapp.repository.DriverRepository;
// import com.example.myapp.repository.UserRepository;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// @SpringBootApplication
// public class MyappApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(MyappApplication.class, args);
//     }

// 	@Bean
// 	public CommandLineRunner testBackend(UserRepository userRepository, ClientRepository clientRepository, DriverRepository driverRepository) {
// 		return args -> {
// 			// Create and save a Client
// 			Client client = new Client();
// 			client.setEmail("client@example.com");
// 			client.setUsername("testClient"); // Username is now part of User
// 			client.setPassword("password123"); // Password should be hashed in production
// 			clientRepository.save(client);
// 			System.out.println("Client saved: " + client);
	
// 			// Create and save a Driver
// 			Driver driver = new Driver();
// 			driver.setEmail("driver@example.com");
// 			driver.setUsername("testDriver"); // Username is now part of User
// 			driver.setPassword("password123"); // Password should be hashed in production
// 			driver.setPhoneNumber("123456789");
// 			driverRepository.save(driver);
// 			System.out.println("Driver saved: " + driver);
	
// 			// Fetch and print all users
// 			System.out.println("All users in the database:");
// 			userRepository.findAll().forEach(user -> System.out.println(user.getEmail() + " - " + user.getUsername()));
// 		};
// 	}
// }