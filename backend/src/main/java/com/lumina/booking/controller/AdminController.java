package com.lumina.booking.controller;

import com.lumina.booking.entity.User;
import com.lumina.booking.repository.BookingRepository;
import com.lumina.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    // GET /api/admin/customers - Danh sách khách hàng
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getCustomers() {
        return ResponseEntity.ok(userRepository.findByRole(User.Role.CUSTOMER));
    }

    // GET /api/admin/stats - Thống kê tổng quan cho Dashboard
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", bookingRepository.count());
        stats.put("pendingCount", bookingRepository.countPending());
        stats.put("partyCount", bookingRepository.countParty());
        stats.put("totalCustomers", userRepository.findByRole(User.Role.CUSTOMER).size());
        return ResponseEntity.ok(stats);
    }
}
