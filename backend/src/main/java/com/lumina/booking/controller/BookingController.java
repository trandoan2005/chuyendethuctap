package com.lumina.booking.controller;

import com.lumina.booking.dto.BookingDTO;
import com.lumina.booking.entity.Booking;
import com.lumina.booking.entity.BookingItem;
import com.lumina.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // GET /api/bookings - Lấy tất cả đơn (Admin)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // GET /api/bookings/regular - Chỉ đơn đặt bàn thường
    @GetMapping("/regular")
    public ResponseEntity<List<Booking>> getRegularBookings() {
        return ResponseEntity.ok(bookingService.getRegularBookings());
    }

    // GET /api/bookings/party - Chỉ đơn đặt tiệc
    @GetMapping("/party")
    public ResponseEntity<List<Booking>> getPartyBookings() {
        return ResponseEntity.ok(bookingService.getPartyBookings());
    }

    // GET /api/bookings/user/{userId} - Lịch sử đặt bàn của khách
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Integer userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    // GET /api/bookings/{id}/items - Chi tiết món ăn
    @GetMapping("/{id}/items")
    public ResponseEntity<List<BookingItem>> getBookingItems(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getBookingItems(id));
    }

    // POST /api/bookings - Tạo đơn đặt bàn mới
    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingDTO.CreateRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    // PUT /api/bookings/{id} - Cập nhật thông tin chi tiết đơn
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBookingDetails(@PathVariable Integer id,
                                                        @Valid @RequestBody BookingDTO.UpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateBookingDetails(id, request));
    }

    // PUT /api/bookings/{id}/status - Cập nhật trạng thái (Admin duyệt/hủy)
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Integer id,
                                                @Valid @RequestBody BookingDTO.UpdateStatusRequest request) {
        return ResponseEntity.ok(bookingService.updateStatus(id, request.getStatus()));
    }
}
