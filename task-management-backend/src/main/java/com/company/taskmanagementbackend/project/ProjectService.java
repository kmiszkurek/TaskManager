package com.company.taskmanagementbackend.project;

import com.company.taskmanagementbackend.common.PageResponse;
import com.company.taskmanagementbackend.exceptions.OperationNotPermitedException;
import com.company.taskmanagementbackend.history.CompletedProjectsResponse;
import com.company.taskmanagementbackend.history.ProjectHistory;
import com.company.taskmanagementbackend.history.ProjectHistoryRepository;
import com.company.taskmanagementbackend.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import static com.company.taskmanagementbackend.project.ProjectSpecification.withOwnerId;


@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectHistoryRepository projectHistoryRepository;

    public Integer save(ProjectRequest projectRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Project project = Project.builder()
                .name(projectRequest.name())
                .description(projectRequest.description())
                .startDate(projectRequest.startDate())
                .endDate(projectRequest.endDate())
                .status(projectRequest.status())
                .completed(false)
                .owner(user)
                .build();
        project.setOwner(user);
        return projectRepository.save(project).getId();
    }

    public ProjectResponse findById(Integer projectId) {
        return projectRepository.findById(projectId)
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .status(project.getStatus())
                        .ownerName(project.getOwner().getFullName())
                        .build())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

    }

    public PageResponse<ProjectResponse> findAllProjects(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("startDate").descending());
        Page<Project> projects = projectRepository.findAllDisplayableProjects(user.getId(), pageable);
        List<ProjectResponse> projectResponse = projects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .status(project.getStatus())
                        .ownerName(project.getOwner().getFullName())
                        .build())
                .toList();
        return new PageResponse<>(
                projectResponse,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isFirst(),
                projects.isLast()
        );
    }

    public PageResponse<ProjectResponse> findAllProjectsByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("startDate").descending());
        Page<Project> projects = projectRepository.findAll(withOwnerId(user.getId()), pageable);
        List<ProjectResponse> projectResponse = projects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .status(project.getStatus())
                        .ownerName(project.getOwner().getFullName())
                        .build())
                .toList();
        return new PageResponse<>(
                projectResponse,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isFirst(),
                projects.isLast()
        );
    }

    public PageResponse<CompletedProjectsResponse> findAllCompletedProjects(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("startDate").descending());
        Page<ProjectHistory> allCompletedProjects = projectHistoryRepository.findAllCompletedProjects(user.getId(),pageable );
        List<CompletedProjectsResponse> completedProjectsResponse = allCompletedProjects.stream()
                .map(projectHistory -> CompletedProjectsResponse.builder()
                        .id(projectHistory.getProject().getId())
                        .name(projectHistory.getProject().getName())
                        .description(projectHistory.getProject().getDescription())
                        .endDate(projectHistory.getProject().getEndDate())
                        .ownerName(projectHistory.getProject().getOwner().getFullName())
                        .isCompleted(projectHistory.isCompleted())
                        .build())
                .toList();
        return new PageResponse<>(
                completedProjectsResponse,
                allCompletedProjects.getNumber(),
                allCompletedProjects.getSize(),
                allCompletedProjects.getTotalElements(),
                allCompletedProjects.getTotalPages(),
                allCompletedProjects.isFirst(),
                allCompletedProjects.isLast()
        );
    }

    public Integer markProjectAsCompleted(Integer projectId, Authentication connectedUser) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(project.getOwner().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this project");
        }
        project.setCompleted(!project.isCompleted());
        projectRepository.save(project);
        return projectId;
    }

    public PageResponse<ProjectResponse> getEndingProjects(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("endDate").descending());
        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = currentDate.plusDays(7);
        Page<Project> allEndingProjects = projectRepository.getEndingProjects(user.getId(),currentDate,endDate,pageable );
        List<ProjectResponse> endingProjectResponse = allEndingProjects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .status(project.getStatus())
                        .ownerName(project.getOwner().getFullName())
                        .build())
                .toList();
        return new PageResponse<>(
                endingProjectResponse,
                allEndingProjects.getNumber(),
                allEndingProjects.getSize(),
                allEndingProjects.getTotalElements(),
                allEndingProjects.getTotalPages(),
                allEndingProjects.isFirst(),
                allEndingProjects.isLast()
        );
    }

    public Integer deleteProject(Integer projectId, Authentication connectedUser) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(project.getOwner().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this project");
        }
        projectRepository.delete(project);
        return projectId;
    }

    public Integer editProject(Integer projectId, ProjectRequest projectRequest, Authentication connectedUser) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(project.getOwner().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this project");
        }
        project.setName(projectRequest.name());
        project.setDescription(projectRequest.description());
        project.setStartDate(projectRequest.startDate());
        project.setEndDate(projectRequest.endDate());
        project.setStatus(projectRequest.status());
        projectRepository.save(project);
        return projectId;
    }

    public PageResponse<ProjectResponse> searchByNameContainingIgnoreCase(String name, int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("startDate").descending());
        Page<Project> projects = projectRepository.searchByNameContainingIgnoreCase(name, pageable);
        List<ProjectResponse> projectResponse = projects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .description(project.getDescription())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .status(project.getStatus())
                        .ownerName(project.getOwner().getFullName())
                        .build())
                .toList();
        return new PageResponse<>(
                projectResponse,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages(),
                projects.isFirst(),
                projects.isLast()
        );
    }
}
