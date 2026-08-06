package com.lumina.booking;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.lumina.booking.entity.User;
import com.lumina.booking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookingApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@lumina.com").isEmpty()) {
                User admin = new User();
                admin.setFullName("Quản Trị Viên");
                admin.setEmail("admin@lumina.com");
                admin.setPhone("0999999999");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
                System.out.println("====== ĐÃ TẠO TÀI KHOẢN ADMIN MẶC ĐỊNH ======");
                System.out.println("Email: admin@lumina.com");
                System.out.println("Pass:  admin123");
                System.out.println("============================================");
            }
        };
    }
}
