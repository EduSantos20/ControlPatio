package com.example.controlPatio.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.controlPatio.entities.UserEntity;
import com.example.controlPatio.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserEntity saveUser(UserEntity userEntity) {
    return userRepository.save(userEntity);
  }

  public UserEntity update(UserEntity userEntity){
    return userRepository.save(userEntity);
  }

  public void excluir(UUID id) {
    userRepository.deleteById(id);
  }

  public List<UserEntity> findAll() {
    return userRepository.findAll();
  }
}

