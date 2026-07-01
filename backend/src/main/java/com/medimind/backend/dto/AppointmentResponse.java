package com.medimind.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {
    private String id;
    private String doctorName;
    private String doctorSpecialization;
    private String hospitalName;
    private String appointmentDate;
    private String appointmentTime;
    private String status;
    private String appointmentType;
    private String reason;
    private Double consultationFee;
}