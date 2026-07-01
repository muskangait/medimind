package com.medimind.backend.controller;

import com.medimind.backend.dto.ApiResponse;
import com.medimind.backend.dto.UserProfileResponse;
import com.medimind.backend.security.UserDetailsImpl;
import com.medimind.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getMyProfile(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        UserProfileResponse profile = userService
                .getUserProfile(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success(profile, "Profile fetched successfully")
        );
    }
}