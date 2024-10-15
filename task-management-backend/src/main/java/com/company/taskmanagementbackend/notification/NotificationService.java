package com.company.taskmanagementbackend.notification;

import com.company.taskmanagementbackend.common.PageResponse;
import com.company.taskmanagementbackend.exceptions.OperationNotPermitedException;
import com.company.taskmanagementbackend.project.Project;
import com.company.taskmanagementbackend.project.ProjectRequest;
import com.company.taskmanagementbackend.project.ProjectResponse;
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

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Integer save(NotificationRequest notificationRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Notification notification = Notification.builder()
                .message(notificationRequest.message())
                .timestamp(notificationRequest.timestamp())
                .build();
        notification.setUser(user);
        return notificationRepository.save(notification).getId();
    }

    public NotificationResponse findById(Integer notificationId) {
        return notificationRepository.findById(notificationId)
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .message(notification.getMessage())
                        .timestamp(notification.getTimestamp())
                        .read(notification.isRead())
                        .userName(notification.getUser().getName())
                        .build())
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));

    }

    public PageResponse<NotificationResponse> findAllNotifications(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        if (size < 1) {
            size = 10;
        }
        Pageable pageable = PageRequest.of(page,size, Sort.by("timestamp").descending());
        Page<Notification> notifications = notificationRepository.findAllDisplayableNotifications(user.getId(), pageable);
        List<NotificationResponse> notificationResponses = notifications.stream()
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .message(notification.getMessage())
                        .timestamp(notification.getTimestamp())
                        .read(notification.isRead())
                        .userName(notification.getUser().getName())
                        .build())
                .toList();
        return new PageResponse<>(
                notificationResponses,
                notifications.getNumber(),
                notifications.getSize(),
                notifications.getTotalElements(),
                notifications.getTotalPages(),
                notifications.isFirst(),
                notifications.isLast()
        );
    }

    public Integer markNotificationAsRead(Integer notificationId, Authentication connectedUser) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + notificationId));
        User user = ((User) connectedUser.getPrincipal());
        if(!Objects.equals(notification.getUser().getId(), user.getId())){
            throw new OperationNotPermitedException("You are not the owner of this notification");
        }
        notification.setRead(!notification.isRead());
        notificationRepository.save(notification);
        return notificationId;
    }
}
