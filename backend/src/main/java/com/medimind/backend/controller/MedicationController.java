package com.medimind.backend.controller;

import com.medimind.backend.dto.ApiResponse;
import com.medimind.backend.dto.MedicationRequest;
import com.medimind.backend.dto.MedicationResponse;
import com.medimind.backend.security.UserDetailsImpl;
import com.medimind.backend.service.MedicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/medications")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService medicationService;

    @PostMapping
    public ResponseEntity<ApiResponse<MedicationResponse>> addMedication(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody MedicationRequest request) {

        MedicationResponse response = medicationService
                .addMedication(userDetails.getId(), request);

        return ResponseEntity.ok(
                ApiResponse.success(response, "Medication added successfully")
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicationResponse>>> getMyMedications(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<MedicationResponse> medications = medicationService
                .getUserMedications(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success(medications, "Medications fetched successfully")
        );
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<MedicationResponse>>> getActiveMedications(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<MedicationResponse> medications = medicationService
                .getActiveMedications(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success(medications, "Active medications fetched successfully")
        );
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateMedication(
            @PathVariable UUID id) {

        medicationService.deactivateMedication(id);

        return ResponseEntity.ok(
                ApiResponse.success(null, "Medication deactivated successfully")
        );
    }
}