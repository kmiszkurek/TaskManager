package com.company.taskmanagementbackend.history;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompletedProjectsResponse {
    private Integer id;
    private String name;
    private String description;
    private LocalDate endDate;
    private String ownerName;
    private boolean isCompleted;
}
