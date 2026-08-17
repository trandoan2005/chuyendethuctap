package com.lumina.booking.controller;

import com.lumina.booking.entity.RestaurantTable;
import com.lumina.booking.repository.TableRepository;
import com.lumina.booking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class TableController {

    private final TableRepository tableRepository;
    private final BookingRepository bookingRepository;

    // GET /api/tables
    @GetMapping
    public ResponseEntity<List<RestaurantTable>> getAllTables() {
        return ResponseEntity.ok(tableRepository.findAll());
    }

    // GET /api/tables/{id}
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getTable(@PathVariable Integer id) {
        return tableRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/tables/available
    @GetMapping("/available")
    public ResponseEntity<List<RestaurantTable>> getAvailableTables() {
        return ResponseEntity.ok(tableRepository.findByStatus(RestaurantTable.TableStatus.AVAILABLE));
    }

    private final com.lumina.booking.service.TableService tableService;

    @GetMapping("/check-availability")
    public ResponseEntity<?> getAvailableTablesByDateTime(
            @RequestParam("date") @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date,
            @RequestParam("time") @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.TIME) java.time.LocalTime time,
            @RequestParam("guests") int guests) {
        
        List<RestaurantTable> availableTables = tableService.getAvailableTables(date, time, guests);
        
        // Nếu không có bàn đơn đủ sức chứa, thử gọi thuật toán ghép bàn
        boolean needsMerge = availableTables.stream().noneMatch(t -> t.getCapacity() >= guests);
        
        if (needsMerge) {
            List<List<RestaurantTable>> suggestions = tableService.suggestMergedTables(date, time, guests, null);
            return ResponseEntity.ok(java.util.Map.of(
                "availableTables", availableTables,
                "suggestions", suggestions
            ));
        }
                
        return ResponseEntity.ok(java.util.Map.of("availableTables", availableTables));
    }

    // POST /api/tables (Admin)
    @PostMapping
    public ResponseEntity<RestaurantTable> createTable(@RequestBody RestaurantTable table) {
        return ResponseEntity.ok(tableRepository.save(table));
    }

    // PUT /api/tables/{id} (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> updateTable(@PathVariable Integer id,
                                                       @RequestBody RestaurantTable updated) {
        return tableRepository.findById(id).map(table -> {
            table.setTableNumber(updated.getTableNumber());
            table.setCapacity(updated.getCapacity());
            table.setArea(updated.getArea());
            table.setStatus(updated.getStatus());
            table.setDescription(updated.getDescription());
            return ResponseEntity.ok(tableRepository.save(table));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/tables/{id} (Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Integer id) {
        tableRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
