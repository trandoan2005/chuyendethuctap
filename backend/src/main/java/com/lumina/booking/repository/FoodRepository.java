package com.lumina.booking.repository;

import com.lumina.booking.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Integer> {
    List<Food> findByIsActive(Boolean isActive);
    List<Food> findByCategory(String category);
}
