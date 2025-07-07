package com.tienda.tienda_app.controller;

import com.tienda.tienda_app.model.Usuario;
import com.tienda.tienda_app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        // En un caso real, la contraseña debería ser encriptada aquí
        return usuarioRepository.save(usuario);
    }
}