package com.company.taskmanagementbackend.project;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface ProjectRepository extends JpaRepository<Project, Integer> , JpaSpecificationExecutor<Project> {

    @Query("""
                SELECT project FROM Project project WHERE project.owner.id = :id
           """)
    Page<Project> findAllDisplayableProjects(Integer id, Pageable pageable);

    @Query("""
        SELECT project FROM Project project
        WHERE project.owner.id = :id
        AND project.endDate BETWEEN :currentDate AND :endDate
    """)
    Page<Project> getEndingProjects(@Param("id") Integer id,
                                    @Param("currentDate") LocalDate currentDate,
                                    @Param("endDate") LocalDate endDate,
                                    Pageable pageable);

    @Query("""
        SELECT project FROM Project project
        WHERE lower(project.name) LIKE lower(concat('%', :name, '%'))
    """)
    Page<Project> searchByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);

}
