package com.medimind.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String gender;
    private String dateOfBirth;
    private String bloodGroup;
    private Double heightCm;
    private Double weightKg;
}