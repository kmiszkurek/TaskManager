package com.company.taskmanagementbackend.project;

import org.springframework.data.jpa.domain.Specification;

public class ProjectSpecification {

    public static Specification<Project> withOwnerId(Integer ownerId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}
