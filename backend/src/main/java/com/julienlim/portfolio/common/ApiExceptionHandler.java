package com.julienlim.portfolio.common;

import java.util.LinkedHashMap;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.julienlim.portfolio.admin.MessageNotFoundException;
import com.julienlim.portfolio.contact.DailyLimitReachedException;

/** Toutes les erreurs de l'API au format RFC 9457 (application/problem+json). */
@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    /** Erreurs de saisie : un message par champ, pour l'afficher sous le champ concerné. */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        var errors = new LinkedHashMap<String, String>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.putIfAbsent(error.getField(), error.getDefaultMessage()));
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Certains champs sont invalides.");
        problem.setProperty("errors", errors);
        return ResponseEntity.badRequest().body(problem);
    }

    @ExceptionHandler(DailyLimitReachedException.class)
    ProblemDetail dailyLimit() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.TOO_MANY_REQUESTS,
                "Le formulaire a reçu trop de messages aujourd'hui. Réessayez demain, ou écrivez-moi sur LinkedIn.");
    }

    @ExceptionHandler(MessageNotFoundException.class)
    ProblemDetail notFound() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, "Ce message n'existe pas ou a été supprimé.");
    }
}
