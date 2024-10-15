package com.company.taskmanagementbackend.notification;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record NotificationRequest (

        Integer id,

        @NotNull(message = "Message cannot be null")
        @NotBlank(message = "Message cannot be blank")
        String message,

        @NotNull(message = "Timestamp cannot be null")
        @NotBlank(message = "Timestamp cannot be blank")
        LocalDateTime timestamp
)
{ }
