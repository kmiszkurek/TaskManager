package com.company.taskmanagementbackend.project;

import com.company.taskmanagementbackend.common.PageResponse;
import com.company.taskmanagementbackend.history.CompletedProjectsResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("project")
@RequiredArgsConstructor
@Tag(name = "Project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Integer> saveProject(
            @Valid @RequestBody ProjectRequest projectRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.save(projectRequest, connectedUser));
    }

    @GetMapping("{project-id}")
    public ResponseEntity<ProjectResponse> findProjectById(
            @PathVariable("project-id") Integer projectId
    ) {
        return ResponseEntity.ok(projectService.findById(projectId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProjectResponse>> findAllProjects(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.findAllProjects(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<ProjectResponse>> findAllProjectsByOwner(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.findAllProjectsByOwner(page, size, connectedUser));
    }

    @GetMapping("/completed")
    public ResponseEntity<PageResponse<CompletedProjectsResponse>> findAllCompletedProjects(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.findAllCompletedProjects(page, size, connectedUser));
    }

    @PatchMapping("/completed/{project-id}")
    public ResponseEntity<Integer> markProjectAsCompleted(
            @PathVariable("project-id") Integer projectId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.markProjectAsCompleted(projectId, connectedUser));
    }

    @GetMapping("/ending")
    public ResponseEntity<PageResponse<ProjectResponse>> getEndingProjects(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(projectService.getEndingProjects(page, size, connectedUser));
    }

    @PostMapping("delete/{project-id}")
    public ResponseEntity<Integer> deleteProject(
            @PathVariable("project-id") Integer projectId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.deleteProject(projectId, connectedUser));
    }

    @PostMapping("edit-project/{project-id}")
    public ResponseEntity<Integer> editProject(
            @PathVariable("project-id") Integer projectId,
            @Valid @RequestBody ProjectRequest projectRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.editProject(projectId, projectRequest, connectedUser));
    }

    @GetMapping("search")
    public ResponseEntity<PageResponse<ProjectResponse>> searchByNameContainingIgnoreCase(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(projectService.searchByNameContainingIgnoreCase(name, page, size, connectedUser));
    }

}
