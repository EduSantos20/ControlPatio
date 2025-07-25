package com.example.controlPatio.controllers;

import com.example.controlPatio.entities.MotoristaEntity;
import com.example.controlPatio.repository.MotoristaRepository;
import com.example.controlPatio.service.MotoristaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/motoristas")
public class MotoristaController {

    private final MotoristaService motoristaService;
    private final MotoristaRepository motoristaRepository;

    public MotoristaController(MotoristaService motoristaService, MotoristaRepository motoristaRepository) {
        this.motoristaService = motoristaService;
        this.motoristaRepository = motoristaRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> criar(@RequestBody MotoristaEntity motoristaEntity) {
        if(motoristaRepository.findByCpf(motoristaEntity.getCpf())){
            return ResponseEntity.badRequest().body("CPF já cadastrado!");
        }
        return ResponseEntity.ok(motoristaService.create(motoristaEntity));
    }
    
    @GetMapping("/verificar-cpf")
    public ResponseEntity<Boolean> verificarCpf(@RequestParam String cpf) {
        boolean exists = motoristaRepository.existsByCpf(cpf);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/listaMotorista")
    public List<MotoristaEntity> listar() {
        return motoristaService.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable UUID id) {
        motoristaService.excluir(id);
        return ResponseEntity.badRequest().body("Motorista excluido!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable UUID id, @RequestBody MotoristaEntity motoristaEntity) {
        return ResponseEntity.ok(motoristaService.update(motoristaEntity));
    }

    @GetMapping("/listaPorStatus/{status}")
    public List<MotoristaEntity> listarPorStatus(@PathVariable String status) {
        return motoristaRepository.findByStatus(status.toUpperCase());
    }

    @PutMapping("/moverParaExpedicao/{id}")
    public ResponseEntity<?> moverParaExpedicao(@PathVariable UUID id) {
        Optional<MotoristaEntity> opt = motoristaRepository.findById(id);
        if (opt.isPresent()) {
            MotoristaEntity m = opt.get();
            m.setStatus("EXPEDICAO");
            motoristaRepository.save(m);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
