package com.medimind.backend.controller;

import com.medimind.backend.dto.ApiResponse;
import com.medimind.backend.dto.AuthRequest;
import com.medimind.backend.dto.JwtResponse;
import com.medimind.backend.dto.RegisterRequest;
import com.medimind.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<JwtResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        JwtResponse response = authService.register(request);
        return ResponseEntity.ok(
                ApiResponse.success(response, "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponse>> login(
            @Valid @RequestBody AuthRequest request) {
        JwtResponse response = authService.login(request);
        return ResponseEntity.ok(
                ApiResponse.success(response, "Login successful")
        );
    }
}