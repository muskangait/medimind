package com.medimind.backend.repository;

import com.medimind.backend.entity.HealthVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HealthVitalRepository extends JpaRepository<HealthVital, UUID> {
    List<HealthVital> findByUserIdOrderByRecordedAtDesc(UUID userId);
    List<HealthVital> findTop7ByUserIdOrderByRecordedAtDesc(UUID userId);
}