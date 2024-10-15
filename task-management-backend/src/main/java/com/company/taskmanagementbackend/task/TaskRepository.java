package com.company.taskmanagementbackend.task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>, JpaSpecificationExecutor<Task> {

    @Query("""
                SELECT task FROM Task task WHERE task.assignedTo.id = :id
           """)
    Page<Task> findAllDisplayableTasks(Integer id, Pageable pageable);
}
