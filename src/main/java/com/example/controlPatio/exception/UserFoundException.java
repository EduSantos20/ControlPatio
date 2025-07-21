package com.example.controlPatio.exception;

public class UserFoundException extends RuntimeException {
    public UserFoundException(String string) {
        super("Usuário já existe!");
    }

}
