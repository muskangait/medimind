package com.medimind.backend.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiskPredictionResponse {
    private String diseaseType;
    private Double riskPercentage;
    private String riskLevel;
    private String specialistType;
    private List<String> recommendations;
    private String modelVersion;
}