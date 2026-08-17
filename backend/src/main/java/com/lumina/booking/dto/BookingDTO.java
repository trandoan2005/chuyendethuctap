package com.lumina.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class BookingDTO {

    @Data
    public static class CreateRequest {
        @NotNull
        private Integer userId;

        private List<Integer> tableIds;
        private Integer packageId;

        @NotBlank
        private String bookingType; // REGULAR | PARTY

        private String eventType;
        private String decorTheme;

        @NotNull
        private LocalDate bookingDate;

        @NotNull
        private LocalTime bookingTime;

        @NotNull
        private Integer guestCount;

        private String note;

        // Danh sách món ăn đặt trước (chỉ dùng khi đặt tiệc)
        private List<ItemRequest> items;
    }

    @Data
    public static class ItemRequest {
        private Integer foodId;
        private Integer quantity;
    }

    @Data
    public static class UpdateStatusRequest {
        @NotBlank
        private String status; // CONFIRMED | CANCELLED | COMPLETED
    }

    @Data
    public static class UpdateRequest {
        @NotNull
        private LocalDate bookingDate;

        @NotNull
        private LocalTime bookingTime;

        @NotNull
        private Integer guestCount;

        private String eventType;
        private String note;
        private List<Integer> tableIds;
    }

    @Data
    public static class BookingResponse {
        private Integer bookingId;
        private String customerName;
        private String customerPhone;
        private String bookingType;
        private String eventType;
        private String decorTheme;
        private List<String> tableNumbers;
        private List<String> areas;
        private String packageName;
        private String bookingDate;
        private String bookingTime;
        private Integer guestCount;
        private String note;
        private String status;
        private String createdAt;
    }
}
