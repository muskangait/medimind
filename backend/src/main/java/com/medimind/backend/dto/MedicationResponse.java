package com.medimind.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicationResponse {
    private String id;
    private String name;
    private String dosage;
    private String frequency;
    private String startDate;
    private String endDate;
    private String instructions;
    private String prescribedBy;
    private Boolean isActive;
}