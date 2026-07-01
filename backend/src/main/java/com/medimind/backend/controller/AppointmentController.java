package com.medimind.backend.controller;

import com.medimind.backend.dto.ApiResponse;
import com.medimind.backend.dto.AppointmentRequest;
import com.medimind.backend.dto.AppointmentResponse;
import com.medimind.backend.security.UserDetailsImpl;
import com.medimind.backend.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> bookAppointment(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody AppointmentRequest request) {

        AppointmentResponse response = appointmentService
                .bookAppointment(userDetails.getId(), request);

        return ResponseEntity.ok(
                ApiResponse.success(response, "Appointment booked successfully")
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getMyAppointments(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        List<AppointmentResponse> appointments = appointmentService
                .getPatientAppointments(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success(appointments, "Appointments fetched successfully")
        );
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelAppointment(
            @PathVariable UUID id) {

        appointmentService.cancelAppointment(id);

        return ResponseEntity.ok(
                ApiResponse.success(null, "Appointment cancelled successfully")
        );
    }
}