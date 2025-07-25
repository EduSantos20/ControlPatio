package com.example.controlPatio.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity(name = "motorist")
@Table(name = "motorist", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "cpf" })
})
public class MotoristaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;
    private String name;

    @Length(min = 11, max = 11, message = "CPF já existe!")
    @Column(unique = true)
    private String cpf;

    @Column(unique = true)
    private String telephone;
    private String transportador;

    @NotBlank()
    private String tipoVeiculo;

    @Length(min = 7, max = 7, message = "A placa dever conter no minino 7 caracter!")
    @Column(unique = true)
    private String placaCavalo;

    @Length(min = 7, max = 7, message = "A placa dever conter no minino 7 caracter!")
    @Column(unique = true)
    private String placaBau1;
    private String placaBau2;
    private String finalidade;
    private String cliente;

    @CreationTimestamp
    private LocalDateTime dataCadastro;
    private String nf;
    private String descricao;

    @Column(name = "status")
    private String status;

}
