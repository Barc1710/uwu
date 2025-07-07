package com.tienda.tienda_app.dto;

import lombok.Data;

@Data
public class DetalleVentaDTO {
    private Integer idProducto;
    private int cantidad;
    private double precioUnitario;
}
