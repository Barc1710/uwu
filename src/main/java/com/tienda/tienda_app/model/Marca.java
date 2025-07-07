package com.tienda.tienda_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "marcas")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_marca;

    @Column(unique = true)
    private String nombre;

    private String descripcion;

    private Boolean activo = true;
}