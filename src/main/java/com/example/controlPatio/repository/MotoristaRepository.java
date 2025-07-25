package com.example.controlPatio.repository;

import com.example.controlPatio.entities.MotoristaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MotoristaRepository extends JpaRepository<MotoristaEntity, UUID> {
    boolean findByCpf(String cpf);
    
    List<MotoristaEntity> findByStatus(String status);

    boolean existsByCpf(String cpf);
}
