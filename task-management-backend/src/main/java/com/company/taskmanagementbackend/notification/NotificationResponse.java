package com.company.taskmanagementbackend.notification;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationResponse {

    private Integer id;
    private String message;
    private LocalDateTime timestamp;
    private boolean read;
    private String userName;
}
