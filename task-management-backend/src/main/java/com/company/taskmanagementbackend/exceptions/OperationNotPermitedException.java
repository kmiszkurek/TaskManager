package com.company.taskmanagementbackend.exceptions;

public class OperationNotPermitedException extends RuntimeException {
    public OperationNotPermitedException(String msg) {
        super(msg);
    }
}
