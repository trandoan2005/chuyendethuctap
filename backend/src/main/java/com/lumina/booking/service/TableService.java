package com.lumina.booking.service;

import com.lumina.booking.entity.RestaurantTable;
import com.lumina.booking.repository.BookingRepository;
import com.lumina.booking.repository.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TableService {

    private final TableRepository tableRepository;
    private final BookingRepository bookingRepository;

    private static final int DEFAULT_MEAL_DURATION_HOURS = 2;

    public List<RestaurantTable> getAvailableTables(LocalDate date, LocalTime time, int guestCount) {
        // 1. Tìm các bàn đang được đặt trong khoảng thời gian [time - 2 tiếng, time + 2 tiếng]
        LocalTime startTime = time.minusHours(DEFAULT_MEAL_DURATION_HOURS);
        LocalTime endTime = time.plusHours(DEFAULT_MEAL_DURATION_HOURS);

        List<Integer> bookedTableIds = bookingRepository.findBookedTableIds(date, startTime, endTime);

        // 2. Lấy tất cả các bàn, loại bỏ các bàn đã được đặt
        List<RestaurantTable> allTables = tableRepository.findAll();
        List<RestaurantTable> availableTables = allTables.stream()
                .filter(t -> !bookedTableIds.contains(t.getTableId()))
                .filter(t -> t.getStatus() == RestaurantTable.TableStatus.AVAILABLE)
                .collect(Collectors.toList());

        // 3. Trả về kết quả, có thể bổ sung thuật toán ghép bàn ở đây
        // Ví dụ: Nhóm theo Area (Khu vực), nếu khách yêu cầu 15 người mà các bàn đơn không đủ,
        // thì đề xuất 2-3 bàn ghép lại. Tạm thời trả về list cơ bản.
        
        return availableTables;
    }

    public List<List<RestaurantTable>> suggestMergedTables(LocalDate date, LocalTime time, int guestCount, String area) {
        List<RestaurantTable> available = getAvailableTables(date, time, guestCount);
        
        // Lọc theo khu vực nếu có
        if (area != null && !area.isEmpty()) {
            available = available.stream().filter(t -> t.getArea().equals(area)).collect(Collectors.toList());
        }

        List<List<RestaurantTable>> suggestions = new ArrayList<>();
        
        // Thuật toán tìm các tổ hợp bàn (đơn giản hoá: ghép 2 bàn)
        for (int i = 0; i < available.size(); i++) {
            for (int j = i + 1; j < available.size(); j++) {
                RestaurantTable t1 = available.get(i);
                RestaurantTable t2 = available.get(j);
                if (t1.getCapacity() + t2.getCapacity() >= guestCount) {
                    suggestions.add(List.of(t1, t2));
                }
            }
        }
        
        return suggestions;
    }
}
