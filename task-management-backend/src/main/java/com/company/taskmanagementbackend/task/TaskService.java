package com.company.taskmanagementbackend.task;

import com.company.taskmanagementbackend.common.PageResponse;
import com.company.taskmanagementbackend.exceptions.OperationNotPermitedException;
import com.company.taskmanagementbackend.project.Project;
import com.company.taskmanagementbackend.project.ProjectRepository;
import com.company.taskmanagementbackend.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;

import static com.company.taskmanagementbackend.task.TaskSpecification.withAssignedToId;


@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public Integer save(TaskRequest taskRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        Task task = Task.builder()
                .title(taskRequest.title())
                .description(taskRequest.description())
                .taskStatus(taskRequest.taskStatus())
                .priority(taskRequest.priority())
                .dueDate(taskRequest.dueDate())
                .build();
        task.setAssignedTo(user);
        return taskRepository.save(task).getId();
    }

    public TaskResponse findById(Integer taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .taskStatus(task.getTaskStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .assignedTo(task.getAssignedTo().getName())
                .projectName(task.getProjectTask().getName())
                .build();
    }


    public PageResponse<TaskResponse> findAllTasks(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("dueDate").descending());
        Page<Task> tasks = taskRepository.findAllDisplayableTasks(user.getId(), pageable);
        List<TaskResponse> taskResponse = tasks.stream()
                .map(task -> TaskResponse.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .description(task.getDescription())
                        .taskStatus(task.getTaskStatus())
                        .priority(task.getPriority())
                        .dueDate(task.getDueDate())
                        .assignedTo(task.getAssignedTo().getName())
                        .projectName(task.getProjectTask().getName())
                        .build())
                .toList();

        return new PageResponse<>(
                taskResponse,
                tasks.getNumber(),
                tasks.getSize(),
                tasks.getTotalElements(),
                tasks.getTotalPages(),
                tasks.isFirst(),
                tasks.isLast()
        );
    }

    public PageResponse<TaskResponse> findAllTasksByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page,size, Sort.by("dueDate").descending());
        Page<Task> tasks = taskRepository.findAll(withAssignedToId(user.getId()), pageable);
        List<TaskResponse> taskResponse = tasks.stream()
                .map(task -> TaskResponse.builder()
                        .id(task.getId())
                        .title(task.getTitle())
                        .description(task.getDescription())
                        .taskStatus(task.getTaskStatus())
                        .priority(task.getPriority())
                        .dueDate(task.getDueDate())
                        .assignedTo(task.getAssignedTo().getName())
                        .projectName(task.getProjectTask().getName())
                        .build())
                        .toList();

        return new PageResponse<>(
                taskResponse,
                tasks.getNumber(),
                tasks.getSize(),
                tasks.getTotalElements(),
                tasks.getTotalPages(),
                tasks.isFirst(),
                tasks.isLast()
        );
    }

    public Integer markTaskAsCompleted(Integer taskId, Authentication connectedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(task.getAssignedTo().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this task");
        }
        task.setCompletedTask(!task.isCompletedTask());
        taskRepository.save(task);
        return taskId;
    }

    public Integer deleteTask(Integer taskId, Authentication connectedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(task.getAssignedTo().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this task");
        }
        taskRepository.delete(task);
        return taskId;
    }

    public Integer editTask(Integer taskId, TaskRequest taskRequest, Authentication connectedUser) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + taskId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(task.getAssignedTo().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this project");
        }
        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setTaskStatus(taskRequest.taskStatus());
        task.setPriority(taskRequest.priority());
        task.setDueDate(taskRequest.dueDate());
        taskRepository.save(task);
        return taskId;
    }

    public Integer assignTaskToProject(Integer projectId, TaskRequest taskRequest, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        Task task = Task.builder()
                .title(taskRequest.title())
                .description(taskRequest.description())
                .taskStatus(taskRequest.taskStatus())
                .priority(taskRequest.priority())
                .dueDate(taskRequest.dueDate())
                .projectTask(project)
                .assignedTo(user)
                .build();

        return taskRepository.save(task).getId();
    }

}
