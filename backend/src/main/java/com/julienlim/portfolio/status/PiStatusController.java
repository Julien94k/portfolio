package com.julienlim.portfolio.status;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PiStatusController {

    private final PiStatusService service;

    public PiStatusController(PiStatusService service) {
        this.service = service;
    }

    @GetMapping("/api/status")
    public PiStatus status() {
        return service.current();
    }
}
