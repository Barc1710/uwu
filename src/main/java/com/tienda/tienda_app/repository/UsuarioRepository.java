package com.tienda.tienda_app.repository;

import com.tienda.tienda_app.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByUsernameAndPasswordHash(String username, String passwordHash);
}