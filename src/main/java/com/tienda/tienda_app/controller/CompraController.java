package com.tienda.tienda_app.controller;

import com.tienda.tienda_app.dto.CompraDTO;
import com.tienda.tienda_app.model.Compra;
import com.tienda.tienda_app.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    public ResponseEntity<Compra> createCompra(@RequestBody CompraDTO compraDTO) {
        return ResponseEntity.ok(compraService.registrarCompra(compraDTO));
    }
}