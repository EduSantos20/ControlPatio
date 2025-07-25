package com.example.controlPatio.service;

import com.example.controlPatio.entities.MotoristaEntity;
import com.example.controlPatio.repository.MotoristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MotoristaService {

    @Autowired
    private MotoristaRepository motoristaRepository;

    public MotoristaService(MotoristaRepository motoristaRepository) {
        this.motoristaRepository = motoristaRepository;
    }

    //criar motorista
    public MotoristaEntity create(MotoristaEntity motoristaEntity) {
        return motoristaRepository.save(motoristaEntity);
    }

    //atualizar motorista
    public MotoristaEntity update(MotoristaEntity motoristaEntity) {
        return motoristaRepository.save(motoristaEntity);
    }

    //excluir motorista
    public void excluir(UUID id) {
        motoristaRepository.deleteById(id);
    }

    //listar todos motorista
    public List<MotoristaEntity> findAll() {
        return motoristaRepository.findAll();
    }
}
