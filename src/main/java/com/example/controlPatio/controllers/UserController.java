
package com.example.controlPatio.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.controlPatio.entities.UserEntity;
import com.example.controlPatio.repository.UserRepository;
import com.example.controlPatio.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Endpoint para criar um novo usuário
  @PostMapping("/create")
  public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity userEntity) {
     UserEntity createdUser = userService.saveUser(userEntity);
     return ResponseEntity.ok(createdUser);
  }

  // Endpoint para buscar um usuário pelo nome de usuário
  @GetMapping("/{id}")
  public ResponseEntity<Object> delet(@PathVariable UUID id) {
    userService.excluir(id);
    return ResponseEntity.ok("Usuário excluído com sucesso!");
  }

  @GetMapping("/listUsers")
  public List<UserEntity> listUsers() {
    return userService.findAll();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteUser(@PathVariable UUID id) {
    userService.excluir(id);
    return ResponseEntity.ok("Usuário excluído com sucesso!");
  }

  @Autowired
  private UserRepository userRepository;
  // Endpoint para verificar se um usuário existe pelo nome de usuário
  @PostMapping("/exists")
  public ResponseEntity<String> userExists(@RequestBody UserEntity userEntity) {
    Optional<UserEntity> user = userRepository.findByUsername(userEntity.getUsername());
    if (user.isPresent() && user.get().getPassword().equals(userEntity.getPassword())) {
      return ResponseEntity.ok().build();
    }
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
  }
}
