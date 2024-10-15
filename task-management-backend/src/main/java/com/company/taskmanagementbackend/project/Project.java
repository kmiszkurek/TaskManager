package com.company.taskmanagementbackend.project;

import com.company.taskmanagementbackend.history.ProjectHistory;
import com.company.taskmanagementbackend.task.Task;
import com.company.taskmanagementbackend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "projectTask")
    private List<Task> tasks;

    @OneToMany(mappedBy = "project")
    private List<ProjectHistory> projectHistories;

}
