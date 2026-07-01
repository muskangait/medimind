package com.medimind.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiskPredictionRequest {
    private String diseaseType;
    private Integer age;
    private String gender;
    private Double bmi;
    private Double glucoseLevel;
    private Double bloodPressure;
    private Double cholesterol;
    private Integer smokingStatus;
    private Integer physicalActivity;
    private String familyHistory;
}