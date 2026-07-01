package com.medimind.backend.service;

import com.medimind.backend.dto.AuthRequest;
import com.medimind.backend.dto.JwtResponse;
import com.medimind.backend.dto.RegisterRequest;
import com.medimind.backend.entity.User;
import com.medimind.backend.repository.UserRepository;
import com.medimind.backend.security.JwtUtils;
import com.medimind.backend.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public JwtResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .id(UUID.randomUUID())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth() != null
                        ? LocalDate.parse(request.getDateOfBirth())
                        : null)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());

        return JwtResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId().toString())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public JwtResponse login(AuthRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        String token = jwtUtils.generateToken(userDetails.getEmail());

        return JwtResponse.builder()
                .token(token)
                .type("Bearer")
                .id(userDetails.getId().toString())
                .email(userDetails.getEmail())
                .fullName(userDetails.getFullName())
                .build();
    }
}