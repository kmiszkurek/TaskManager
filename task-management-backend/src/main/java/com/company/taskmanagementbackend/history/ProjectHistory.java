package com.company.taskmanagementbackend.history;

import com.company.taskmanagementbackend.project.Project;
import com.company.taskmanagementbackend.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "project_history")
public class ProjectHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private String startDate;
    private String endDate;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
