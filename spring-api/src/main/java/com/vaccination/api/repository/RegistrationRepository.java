package com.vaccination.api.repository;

import com.vaccination.api.models.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByDateOfBirthBetween(LocalDate startDate, LocalDate endDate);

    List<Registration> findByCity(String city);
}
