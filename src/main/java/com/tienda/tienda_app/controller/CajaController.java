package com.tienda.tienda_app.controller;

import com.tienda.tienda_app.model.Caja;
import com.tienda.tienda_app.repository.CajaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cajas")
public class CajaController {

    @Autowired
    private CajaRepository cajaRepository;

    @GetMapping
    public List<Caja> getAllCajas() {
        return cajaRepository.findAll();
    }

    @PostMapping
    public Caja createCaja(@RequestBody Caja caja) {
        // La lógica de negocio (ej. calcular descuadre) debería ir en un Service.
        return cajaRepository.save(caja);
    }
}