package com.example.capstone.dto;

import java.time.LocalDateTime;

public class ExceptionResponse {

    private LocalDateTime exceptionTime;
    private String exceptionMessage;
    private String requestDescription;

    public ExceptionResponse() {
        this.exceptionTime = LocalDateTime.now();
    }

    public ExceptionResponse(String exceptionMessage, String requestDescription) {
        this();
        this.exceptionMessage = exceptionMessage;
        this.requestDescription = requestDescription;
    }

    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public String getRequestDescription() {
        return requestDescription;
    }

    public LocalDateTime getExceptionTime() {
        return exceptionTime;
    }

}
