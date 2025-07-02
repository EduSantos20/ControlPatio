package com.example.controlPatio.entities;

import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity(name = "Users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;

    @NotBlank()
    private String name;

    @NotBlank()
    private String username;

    @NotBlank()
    private String password;

    // Getters and Setters
    //Não é necessário adicionar getters e setters quando se usa Lombok com a anotação @Data, pois ela já gera esses métodos automaticamente.
}
