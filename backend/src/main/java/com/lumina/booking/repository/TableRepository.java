package com.lumina.booking.repository;

import com.lumina.booking.entity.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TableRepository extends JpaRepository<RestaurantTable, Integer> {
    List<RestaurantTable> findByStatus(RestaurantTable.TableStatus status);
    List<RestaurantTable> findByArea(String area);
}
