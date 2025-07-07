package com.tienda.tienda_app.repository;

// CategoriaRepository.java


import com.tienda.tienda_app.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {}