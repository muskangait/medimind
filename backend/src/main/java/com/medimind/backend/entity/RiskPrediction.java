package com.medimind.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "risk_predictions", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiskPrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "disease_type", nullable = false)
    private String diseaseType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "input_features", columnDefinition = "jsonb")
    private String inputFeatures;

    @Column(name = "risk_percentage")
    private Double riskPercentage;

    @Column(name = "risk_level")
    private String riskLevel;

    @Column(name = "specialist_type")
    private String specialistType;

    @Column(name = "recommendations", columnDefinition = "text[]")
    private String[] recommendations;

    @Column(name = "model_version")
    private String modelVersion;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}