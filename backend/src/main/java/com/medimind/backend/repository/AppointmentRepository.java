package com.medimind.backend.repository;

import com.medimind.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByPatientIdOrderByAppointmentDateDesc(UUID patientId);
    List<Appointment> findByDoctorIdOrderByAppointmentDateDesc(UUID doctorId);
    List<Appointment> findByPatientIdAndStatus(UUID patientId, String status);
}