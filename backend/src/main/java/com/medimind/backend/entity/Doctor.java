package com.medimind.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import java.util.UUID;

@Entity
@Table(name = "doctors", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "hospital_name")
    private String hospitalName;

    @Column(name = "city")
    private String city;

    @Column(name = "consultation_fee")
    private Double consultationFee;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "total_reviews")
    private Integer totalReviews;

    @Column(name = "available_days", columnDefinition = "text[]")
    private String[] availableDays;

    @Column(name = "bio", columnDefinition = "text")
    private String bio;

    @Column(name = "languages", columnDefinition = "text[]")
    private String[] languages;

    @Column(name = "is_active")
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
