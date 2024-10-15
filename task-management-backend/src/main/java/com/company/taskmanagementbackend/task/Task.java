package com.company.taskmanagementbackend.task;

import com.company.taskmanagementbackend.user.User;
import com.company.taskmanagementbackend.project.Project;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private String taskStatus;
    private String priority;
    private LocalDate dueDate;
    private boolean completedTask;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projectTask;

    @ManyToOne
    private User assignedTo;
}
