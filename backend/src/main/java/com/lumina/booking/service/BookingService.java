package com.lumina.booking.service;

import com.lumina.booking.dto.BookingDTO;
import com.lumina.booking.entity.*;
import com.lumina.booking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TableRepository tableRepository;
    private final PackageRepository packageRepository;
    private final FoodRepository foodRepository;
    private final BookingItemRepository bookingItemRepository;

    @Transactional
    public Booking createBooking(BookingDTO.CreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingType(Booking.BookingType.valueOf(request.getBookingType()));
        booking.setBookingDate(request.getBookingDate());
        booking.setBookingTime(request.getBookingTime());
        booking.setGuestCount(request.getGuestCount());
        booking.setNote(request.getNote());
        booking.setEventType(request.getEventType());
        booking.setDecorTheme(request.getDecorTheme());
        booking.setStatus(Booking.BookingStatus.PENDING);

        if (request.getTableId() != null) {
            RestaurantTable table = tableRepository.findById(request.getTableId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy bàn"));
            booking.setTable(table);
        }

        if (request.getPackageId() != null) {
            PartyPackage pkg = packageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy gói tiệc"));
            booking.setPartyPackage(pkg);
        }

        Booking saved = bookingRepository.save(booking);

        // Lưu danh sách món ăn nếu có
        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (BookingDTO.ItemRequest itemReq : request.getItems()) {
                Food food = foodRepository.findById(itemReq.getFoodId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy món ăn"));
                BookingItem item = new BookingItem();
                item.setBooking(saved);
                item.setFood(food);
                item.setQuantity(itemReq.getQuantity());
                bookingItemRepository.save(item);
            }
        }

        return saved;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(Integer userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    public List<Booking> getRegularBookings() {
        return bookingRepository.findByBookingType(Booking.BookingType.REGULAR);
    }

    public List<Booking> getPartyBookings() {
        return bookingRepository.findByBookingType(Booking.BookingType.PARTY);
    }

    @Transactional
    public Booking updateStatus(Integer bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn đặt bàn"));

        booking.setStatus(Booking.BookingStatus.valueOf(status));

        // Khi xác nhận, cập nhật trạng thái bàn
        if ("CONFIRMED".equals(status) && booking.getTable() != null) {
            booking.getTable().setStatus(RestaurantTable.TableStatus.RESERVED);
            tableRepository.save(booking.getTable());
        }

        return bookingRepository.save(booking);
    }

    public List<BookingItem> getBookingItems(Integer bookingId) {
        return bookingItemRepository.findByBookingBookingId(bookingId);
    }
}
