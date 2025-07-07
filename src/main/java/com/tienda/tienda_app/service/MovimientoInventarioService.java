package com.tienda.tienda_app.service;

import com.tienda.tienda_app.model.MovimientoInventario;
import com.tienda.tienda_app.model.Producto;
import com.tienda.tienda_app.model.Usuario;
import com.tienda.tienda_app.repository.MovimientoInventarioRepository;
import com.tienda.tienda_app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public void registrarMovimiento(Producto producto, int cantidad, MovimientoInventario.TipoMovimiento tipo, Integer referenciaId, Usuario usuario) {
        // 1. Actualizar el stock del producto
        int stockActual = producto.getStock();
        int nuevoStock = stockActual + cantidad;
        if (nuevoStock < 0) {
            throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
        }
        producto.setStock(nuevoStock);
        productoRepository.save(producto);

        // 2. Crear y guardar el registro del movimiento para auditoría
        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setProducto(producto);
        movimiento.setCantidad(cantidad);
        movimiento.setTipo_movimiento(tipo);
        movimiento.setReferenciaId(referenciaId);
        movimiento.setUsuarioResponsable(usuario);

        movimientoRepository.save(movimiento);
    }
}