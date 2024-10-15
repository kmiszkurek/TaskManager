package com.company.taskmanagementbackend.notification;

import com.company.taskmanagementbackend.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Integer> saveNotification(
            @Valid @RequestBody NotificationRequest notificationRequest,
            Authentication connectedUser
    ) {
        Integer notificationId = notificationService.save(notificationRequest, connectedUser);
        return ResponseEntity.ok(notificationId);
    }

    @GetMapping("{notification-id}")
    public ResponseEntity<NotificationResponse> findNotificationById(
            @PathVariable("notification-id") Integer notificationId
    ) {
        NotificationResponse notificationResponse = notificationService.findById(notificationId);
        return ResponseEntity.ok(notificationResponse);
    }

    @GetMapping
    public ResponseEntity<PageResponse<NotificationResponse>> findAllNotifications(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            Authentication connectedUser
    ) {
        System.out.println("Page: " + page + ", Size: " + size);
        if (size < 1) {
            size = 10;
        }
        PageResponse<NotificationResponse> pageResponse = notificationService.findAllNotifications(page, size, connectedUser);
        return ResponseEntity.ok(pageResponse);
    }

    @PatchMapping("/read/{notification-id}")
    public ResponseEntity<Integer> markNotificationAsRead(
            @PathVariable("notification-id") Integer notificationId,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(notificationService.markNotificationAsRead(notificationId, connectedUser));
    }
}
