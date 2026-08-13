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

    @GetMapping("/check-availability")
    public ResponseEntity<List<RestaurantTable>> getAvailableTablesByDate(
            @RequestParam("date") @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        List<RestaurantTable> allTables = tableRepository.findByStatus(RestaurantTable.TableStatus.AVAILABLE);
        List<Integer> bookedTableIds = bookingRepository.findBookedTableIds(date);
        
        List<RestaurantTable> availableTables = allTables.stream()
                .filter(table -> !bookedTableIds.contains(table.getTableId()))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(availableTables);
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
