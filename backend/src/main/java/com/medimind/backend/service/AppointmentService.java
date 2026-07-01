package com.medimind.backend.service;

import com.medimind.backend.dto.AppointmentRequest;
import com.medimind.backend.dto.AppointmentResponse;
import com.medimind.backend.entity.Appointment;
import com.medimind.backend.entity.Doctor;
import com.medimind.backend.entity.User;
import com.medimind.backend.repository.AppointmentRepository;
import com.medimind.backend.repository.DoctorRepository;
import com.medimind.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public AppointmentResponse bookAppointment(UUID patientId, AppointmentRequest request) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(UUID.fromString(request.getDoctorId()))
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = Appointment.builder()
                .id(UUID.randomUUID())
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(LocalDate.parse(request.getAppointmentDate()))
                .appointmentTime(LocalTime.parse(request.getAppointmentTime()))
                .status("scheduled")
                .appointmentType(request.getAppointmentType() != null
                        ? request.getAppointmentType() : "in_person")
                .reason(request.getReason())
                .notes(request.getNotes())
                .build();

        appointmentRepository.save(appointment);

        return mapToResponse(appointment);
    }

    public List<AppointmentResponse> getPatientAppointments(UUID patientId) {
        return appointmentRepository
                .findByPatientIdOrderByAppointmentDateDesc(patientId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void cancelAppointment(UUID appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus("cancelled");
        appointmentRepository.save(appointment);
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId().toString())
                .doctorName(appointment.getDoctor().getFullName())
                .doctorSpecialization(appointment.getDoctor().getSpecialization())
                .hospitalName(appointment.getDoctor().getHospitalName())
                .appointmentDate(appointment.getAppointmentDate().toString())
                .appointmentTime(appointment.getAppointmentTime().toString())
                .status(appointment.getStatus())
                .appointmentType(appointment.getAppointmentType())
                .reason(appointment.getReason())
                .consultationFee(appointment.getDoctor().getConsultationFee())
                .build();
    }
}