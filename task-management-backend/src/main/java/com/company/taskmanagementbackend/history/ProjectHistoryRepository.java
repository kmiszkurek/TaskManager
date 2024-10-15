package com.company.taskmanagementbackend.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectHistoryRepository extends JpaRepository<ProjectHistory, Integer> {

    @Query("""
                SELECT ph FROM ProjectHistory ph
                WHERE ph.project.id = :projectId
          """)
    Page<ProjectHistory> findAllCompletedProjects(Integer projectId, Pageable pageable);
}
