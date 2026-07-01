package com.medimind.backend.controller;

import com.medimind.backend.dto.ApiResponse;
import com.medimind.backend.entity.Doctor;
import com.medimind.backend.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Doctor>>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(
                ApiResponse.success(doctors, "Doctors fetched successfully")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Doctor>> getDoctorById(
            @PathVariable UUID id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(
                ApiResponse.success(doctor, "Doctor fetched successfully")
        );
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<ApiResponse<List<Doctor>>> getDoctorsBySpecialization(
            @PathVariable String specialization) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(
                ApiResponse.success(doctors, "Doctors fetched successfully")
        );
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<ApiResponse<List<Doctor>>> getDoctorsByCity(
            @PathVariable String city) {
        List<Doctor> doctors = doctorService.getDoctorsByCity(city);
        return ResponseEntity.ok(
                ApiResponse.success(doctors, "Doctors fetched successfully")
        );
    }
}