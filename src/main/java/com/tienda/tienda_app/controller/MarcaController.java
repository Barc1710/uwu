package com.tienda.tienda_app.controller;


import com.tienda.tienda_app.model.Marca;
import com.tienda.tienda_app.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    @Autowired
    private MarcaRepository marcaRepository;

    @GetMapping
    public List<Marca> getAllMarcas() {
        return marcaRepository.findAll();
    }

    @PostMapping
    public Marca createMarca(@RequestBody Marca marca) {
        return marcaRepository.save(marca);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> updateMarca(@PathVariable Integer id, @RequestBody Marca marcaDetails) {
        return marcaRepository.findById(id)
                .map(marca -> {
                    marca.setNombre(marcaDetails.getNombre());
                    marca.setDescripcion(marcaDetails.getDescripcion());
                    marca.setActivo(marcaDetails.getActivo());
                    Marca updatedMarca = marcaRepository.save(marca);
                    return ResponseEntity.ok(updatedMarca);
                }).orElse(ResponseEntity.notFound().build());
    }
}