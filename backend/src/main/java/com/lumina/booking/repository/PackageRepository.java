package com.lumina.booking.repository;

import com.lumina.booking.entity.PartyPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PackageRepository extends JpaRepository<PartyPackage, Integer> {
    List<PartyPackage> findByIsActive(Boolean isActive);
}
