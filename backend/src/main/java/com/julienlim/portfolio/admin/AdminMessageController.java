package com.julienlim.portfolio.admin;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Accès réservé au rôle ADMIN (voir SecurityConfig). */
@RestController
@RequestMapping("/api/admin/messages")
public class AdminMessageController {

    private final AdminMessageService service;

    public AdminMessageController(AdminMessageService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdminMessageView> list() {
        return service.latest();
    }

    @PatchMapping("/{id}/read")
    public AdminMessageView markRead(@PathVariable UUID id) {
        return service.markRead(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
