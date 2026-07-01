package com.medimind.backend.repository;

import com.medimind.backend.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, UUID> {
    List<Medication> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Medication> findByUserIdAndIsActiveTrue(UUID userId);
}