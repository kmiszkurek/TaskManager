package com.company.taskmanagementbackend.project;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProjectRequest(

        Integer id,

        @NotNull(message = "100")
        @NotBlank(message = "100")
        String name,

        @NotNull(message = "101")
        @NotBlank(message = "101")
        String description,

        @NotNull(message = "102")
        LocalDate startDate,

        @NotNull(message = "103")
        LocalDate endDate,

        @NotNull(message = "104")
        @NotBlank(message = "104")
        String status
) {
}
