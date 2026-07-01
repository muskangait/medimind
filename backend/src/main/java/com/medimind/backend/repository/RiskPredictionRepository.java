package com.medimind.backend.repository;

import com.medimind.backend.entity.RiskPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RiskPredictionRepository extends JpaRepository<RiskPrediction, UUID> {
    List<RiskPrediction> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<RiskPrediction> findByUserIdAndDiseaseType(UUID userId, String diseaseType);
}