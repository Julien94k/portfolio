package com.julienlim.portfolio.admin;

import java.util.UUID;

public class MessageNotFoundException extends RuntimeException {

    public MessageNotFoundException(UUID id) {
        super("Message introuvable : " + id);
    }
}
