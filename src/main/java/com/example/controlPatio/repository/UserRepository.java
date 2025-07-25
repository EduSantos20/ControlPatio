package com.example.controlPatio.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.controlPatio.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
  // Método para encontrar um usuário pelo nome de usuário
  Optional<UserEntity> findByUsername(String username);
}
