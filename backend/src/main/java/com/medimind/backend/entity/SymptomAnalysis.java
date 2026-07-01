package com.medimind.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "symptom_analyses", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SymptomAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "symptoms", columnDefinition = "text[]")
    private String[] symptoms;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender")
    private String gender;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "lifestyle_factors", columnDefinition = "jsonb")
    private String lifestyleFactors;

    @Column(name = "ai_response", columnDefinition = "text")
    private String aiResponse;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "probable_conditions", columnDefinition = "jsonb")
    private String probableConditions;

    @Column(name = "severity")
    private String severity;

    @Column(name = "recommendations", columnDefinition = "text[]")
    private String[] recommendations;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}