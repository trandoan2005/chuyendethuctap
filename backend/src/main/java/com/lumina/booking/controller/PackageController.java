package com.lumina.booking.controller;

import com.lumina.booking.entity.PartyPackage;
import com.lumina.booking.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageRepository packageRepository;

    // GET /api/packages
    @GetMapping
    public ResponseEntity<List<PartyPackage>> getAllPackages(@RequestParam(required = false, defaultValue = "false") boolean all) {
        if (all) {
            return ResponseEntity.ok(packageRepository.findAll());
        }
        return ResponseEntity.ok(packageRepository.findByIsActive(true));
    }

    // GET /api/packages/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PartyPackage> getPackage(@PathVariable Integer id) {
        return packageRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/packages (Admin)
    @PostMapping
    public ResponseEntity<PartyPackage> createPackage(@RequestBody PartyPackage pkg) {
        if (pkg.getIsActive() == null) {
            pkg.setIsActive(true);
        }
        return ResponseEntity.ok(packageRepository.save(pkg));
    }

    // PUT /api/packages/{id} (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<PartyPackage> updatePackage(@PathVariable Integer id,
                                                      @RequestBody PartyPackage updated) {
        return packageRepository.findById(id).map(pkg -> {
            pkg.setPackageName(updated.getPackageName());
            pkg.setDescription(updated.getDescription());
            pkg.setPrice(updated.getPrice());
            pkg.setImageUrl(updated.getImageUrl());
            if (updated.getIsActive() != null) {
                pkg.setIsActive(updated.getIsActive());
            }
            return ResponseEntity.ok(packageRepository.save(pkg));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/packages/{id} (Admin - Soft Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Integer id) {
        return packageRepository.findById(id).map(pkg -> {
            pkg.setIsActive(false);
            packageRepository.save(pkg);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
