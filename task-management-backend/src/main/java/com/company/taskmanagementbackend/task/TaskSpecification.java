package com.company.taskmanagementbackend.task;


import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {
    public static Specification<Task> withAssignedToId(Integer assignedTo) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("assignedTo").get("id"), assignedTo);
    }
}
