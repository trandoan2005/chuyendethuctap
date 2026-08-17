package com.lumina.booking.repository;

import com.lumina.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserUserId(Integer userId);
    List<Booking> findByStatus(Booking.BookingStatus status);
    List<Booking> findByBookingType(Booking.BookingType bookingType);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'PENDING'")
    long countPending();

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingType = 'PARTY'")
    long countParty();

    @Query("SELECT t.tableId FROM Booking b JOIN b.tables t WHERE b.bookingDate = :date AND b.bookingTime BETWEEN :startTime AND :endTime AND b.status != 'CANCELLED' AND b.status != 'COMPLETED'")
    List<Integer> findBookedTableIds(
        @org.springframework.data.repository.query.Param("date") java.time.LocalDate date,
        @org.springframework.data.repository.query.Param("startTime") java.time.LocalTime startTime,
        @org.springframework.data.repository.query.Param("endTime") java.time.LocalTime endTime
    );
}
