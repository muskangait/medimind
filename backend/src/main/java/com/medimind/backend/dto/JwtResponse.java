package com.medimind.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String type;
    private String id;
    private String email;
    private String fullName;
}