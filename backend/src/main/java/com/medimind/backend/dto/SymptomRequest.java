package com.medimind.backend.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SymptomRequest {
    private List<String> symptoms;
    private Integer age;
    private String gender;
    private Map<String, Object> lifestyleFactors;
}