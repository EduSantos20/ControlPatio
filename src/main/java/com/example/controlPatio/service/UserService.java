package com.example.controlPatio.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.controlPatio.entities.UserEntity;
import com.example.controlPatio.exception.UserFoundException;
import com.example.controlPatio.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserEntity saveUser(UserEntity userEntity) {
    // Verifica se o nome de usuário já existe
    this.userRepository.findByUsername(userEntity.getUsername()).ifPresent(user -> {
      throw new UserFoundException("Usuário já existe!");
    });

    // Criptografa a senha
    var encodedPassword = passwordEncoder.encode(userEntity.getPassword());
    userEntity.setPassword(encodedPassword);

    // Salva o usuário
    return this.userRepository.save(userEntity);
  }

  public UserEntity update(UserEntity userEntity) {
    return userRepository.save(userEntity);
  }

  public void excluir(UUID id) {
    userRepository.deleteById(id);
  }

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }
}
