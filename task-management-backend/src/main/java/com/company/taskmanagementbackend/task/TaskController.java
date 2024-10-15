package com.company.taskmanagementbackend.task;

import com.company.taskmanagementbackend.common.PageResponse;
import com.company.taskmanagementbackend.project.ProjectRequest;
import com.company.taskmanagementbackend.project.ProjectResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("task")
@RequiredArgsConstructor
@Tag(name = "Task")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Integer> saveTask(
            @Valid @RequestBody TaskRequest taskRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(taskService.save(taskRequest, connectedUser));
    }

    @GetMapping
    public ResponseEntity<PageResponse<TaskResponse>> findAllTasks(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(taskService.findAllTasks(page, size, connectedUser));
    }

    @GetMapping("{task-id}")
    public ResponseEntity<TaskResponse> findTaskById(
            @PathVariable("task-id") Integer taskId
    ) {
        return ResponseEntity.ok(taskService.findById(taskId));
    }

    @PostMapping("delete/{task-id}")
    public ResponseEntity<Integer> deleteTask(
            @PathVariable("task-id") Integer taskId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(taskService.deleteTask(taskId, connectedUser));
    }

    @PostMapping("edit-task/{task-id}")
    public ResponseEntity<Integer> editTask(
            @PathVariable("task-id") Integer taskId,
            @Valid @RequestBody TaskRequest taskRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(taskService.editTask(taskId, taskRequest, connectedUser));
    }

    @PostMapping("assign/{project-id}")
    public ResponseEntity<Integer> assignTaskToProject(
            @PathVariable("project-id") Integer projectId,
            @Valid @RequestBody TaskRequest taskRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(taskService.assignTaskToProject(projectId, taskRequest, connectedUser));
    }

}
