package com.medimind.backend.service;

import com.medimind.backend.dto.UserProfileResponse;
import com.medimind.backend.entity.User;
import com.medimind.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileResponse getUserProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth() != null
                        ? user.getDateOfBirth().toString() : null)
                .bloodGroup(user.getBloodGroup())
                .heightCm(user.getHeightCm())
                .weightKg(user.getWeightKg())
                .build();
    }

    public UserProfileResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth() != null
                        ? user.getDateOfBirth().toString() : null)
                .bloodGroup(user.getBloodGroup())
                .heightCm(user.getHeightCm())
                .weightKg(user.getWeightKg())
                .build();
    }
}