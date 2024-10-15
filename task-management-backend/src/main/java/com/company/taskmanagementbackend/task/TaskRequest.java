package com.company.taskmanagementbackend.task;

import com.company.taskmanagementbackend.project.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskRequest (
        Integer id,

        @NotNull(message = "200")
        @NotBlank(message = "200")
        String title,

        @NotNull(message = "201")
        @NotBlank(message = "201")
        String description,

        @NotNull(message = "202")
        @NotBlank(message = "202")
        String taskStatus,

        @NotNull(message = "203")
        @NotBlank(message = "203")
        String priority,

        @NotNull(message = "204")
        LocalDate dueDate

)

{
}
