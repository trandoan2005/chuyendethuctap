package com.lumina.booking.repository;

import com.lumina.booking.entity.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingItemRepository extends JpaRepository<BookingItem, Integer> {
    List<BookingItem> findByBookingBookingId(Integer bookingId);
}
