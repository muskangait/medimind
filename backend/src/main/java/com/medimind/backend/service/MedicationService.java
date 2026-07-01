package com.medimind.backend.service;

import com.medimind.backend.dto.MedicationRequest;
import com.medimind.backend.dto.MedicationResponse;
import com.medimind.backend.entity.Medication;
import com.medimind.backend.entity.User;
import com.medimind.backend.repository.MedicationRepository;
import com.medimind.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicationService {

    private final MedicationRepository medicationRepository;
    private final UserRepository userRepository;

    public MedicationResponse addMedication(UUID userId, MedicationRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Medication medication = Medication.builder()
                .id(UUID.randomUUID())
                .user(user)
                .name(request.getName())
                .dosage(request.getDosage())
                .frequency(request.getFrequency())
                .startDate(LocalDate.parse(request.getStartDate()))
                .endDate(request.getEndDate() != null
                        ? LocalDate.parse(request.getEndDate()) : null)
                .instructions(request.getInstructions())
                .prescribedBy(request.getPrescribedBy())
                .isActive(true)
                .build();

        medicationRepository.save(medication);

        return mapToResponse(medication);
    }

    public List<MedicationResponse> getUserMedications(UUID userId) {
        return medicationRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MedicationResponse> getActiveMedications(UUID userId) {
        return medicationRepository
                .findByUserIdAndIsActiveTrue(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deactivateMedication(UUID medicationId) {
        Medication medication = medicationRepository.findById(medicationId)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
        medication.setIsActive(false);
        medicationRepository.save(medication);
    }

    private MedicationResponse mapToResponse(Medication medication) {
        return MedicationResponse.builder()
                .id(medication.getId().toString())
                .name(medication.getName())
                .dosage(medication.getDosage())
                .frequency(medication.getFrequency())
                .startDate(medication.getStartDate().toString())
                .endDate(medication.getEndDate() != null
                        ? medication.getEndDate().toString() : null)
                .instructions(medication.getInstructions())
                .prescribedBy(medication.getPrescribedBy())
                .isActive(medication.getIsActive())
                .build();
    }
}