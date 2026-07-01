package com.medimind.backend.repository;

import com.medimind.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findBySpecialization(String specialization);
    List<Doctor> findByCity(String city);
    List<Doctor> findByIsActiveTrue();
    List<Doctor> findBySpecializationAndCity(String specialization, String city);
}