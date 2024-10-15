package com.company.taskmanagementbackend.task;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskResponse {
    private Integer id;
    private String title;
    private String description;
    private String taskStatus;
    private String priority;
    private LocalDate dueDate;
    private String assignedTo;
    private String projectName;

}
