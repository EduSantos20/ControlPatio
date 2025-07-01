package com.example.controlPatio.repository;


import com.example.controlPatio.entities.MotoristaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MotoristaRepository extends JpaRepository<MotoristaEntity, UUID> {
    Optional<MotoristaEntity> findByCpf(String cpf);
}
