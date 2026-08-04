package com.lumina.booking.controller;

import com.lumina.booking.entity.Food;
import com.lumina.booking.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodRepository foodRepository;

    // GET /api/foods
    @GetMapping
    public ResponseEntity<List<Food>> getAllFoods() {
        return ResponseEntity.ok(foodRepository.findByIsActive(true));
    }

    // GET /api/foods/category/{category}
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Food>> getFoodsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(foodRepository.findByCategory(category));
    }

    // POST /api/foods (Admin)
    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        return ResponseEntity.ok(foodRepository.save(food));
    }

    // PUT /api/foods/{id} (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Integer id, @RequestBody Food updated) {
        return foodRepository.findById(id).map(food -> {
            food.setFoodName(updated.getFoodName());
            food.setPrice(updated.getPrice());
            food.setCategory(updated.getCategory());
            food.setDescription(updated.getDescription());
            food.setImageUrl(updated.getImageUrl());
            food.setIsActive(updated.getIsActive());
            return ResponseEntity.ok(foodRepository.save(food));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/foods/{id} (Admin - soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Integer id) {
        foodRepository.findById(id).ifPresent(food -> {
            food.setIsActive(false);
            foodRepository.save(food);
        });
        return ResponseEntity.noContent().build();
    }
}
