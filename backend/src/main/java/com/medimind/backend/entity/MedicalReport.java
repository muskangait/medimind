package com.medimind.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medical_reports", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "report_name", nullable = false)
    private String reportName;

    @Column(name = "report_type")
    private String reportType;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "ai_summary", columnDefinition = "text")
    private String aiSummary;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "key_findings", columnDefinition = "jsonb")
    private String keyFindings;

    @Column(name = "recommendations", columnDefinition = "text[]")
    private String[] recommendations;

    @Column(name = "is_analyzed")
    private Boolean isAnalyzed;

    @Column(name = "test_date")
    private LocalDate testDate;

    @Column(name = "lab_name")
    private String labName;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}