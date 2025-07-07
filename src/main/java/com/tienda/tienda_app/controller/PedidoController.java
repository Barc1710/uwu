package com.tienda.tienda_app.controller;

import com.tienda.tienda_app.dto.PedidoDTO;
import com.tienda.tienda_app.model.Pedido;
import com.tienda.tienda_app.repository.PedidoRepository;
import com.tienda.tienda_app.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private PedidoRepository pedidoRepository;

    // Endpoint para registrar un nuevo pedido
    @PostMapping
    public ResponseEntity<Pedido> createPedido(@RequestBody PedidoDTO pedidoDTO) {
        try {
            Pedido nuevoPedido = pedidoService.registrarPedido(pedidoDTO);
            return ResponseEntity.ok(nuevoPedido);
        } catch (RuntimeException e) {
            // Es buena práctica devolver un mensaje de error claro.
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Endpoint para obtener todos los pedidos
    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    // Endpoint para obtener un pedido por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Integer id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para marcar un pedido como ENTREGADO
    @PutMapping("/{id}/entregar")
    public ResponseEntity<Pedido> entregarPedido(@PathVariable Integer id) {
        try {
            Pedido pedidoEntregado = pedidoService.marcarComoEntregado(id);
            return ResponseEntity.ok(pedidoEntregado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Endpoint para marcar un pedido como CANCELADO
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Pedido> cancelarPedido(@PathVariable Integer id) {
        try {
            Pedido pedidoCancelado = pedidoService.cancelarPedido(id);
            return ResponseEntity.ok(pedidoCancelado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}