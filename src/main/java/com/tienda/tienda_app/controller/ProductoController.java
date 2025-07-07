package com.tienda.tienda_app.controller;


import com.tienda.tienda_app.model.Producto;
import com.tienda.tienda_app.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) {
        return productoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Integer id, @RequestBody Producto productoDetails) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoDetails.getNombre());
                    producto.setCodigo_sku(productoDetails.getCodigo_sku());
                    producto.setDescripcion(productoDetails.getDescripcion());
                    producto.setPrecioVenta(productoDetails.getPrecioVenta());
                    producto.setCostoCompra(productoDetails.getCostoCompra());
                    producto.setStockMinimo(productoDetails.getStockMinimo());
                    producto.setActivo(productoDetails.getActivo());
                    producto.setMarca(productoDetails.getMarca());
                    producto.setCategoria(productoDetails.getCategoria());

                    return ResponseEntity.ok(productoRepository.save(producto));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
        return productoRepository.findById(id)
                .map(producto -> {
                    productoRepository.delete(producto);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}