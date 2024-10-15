package com.company.taskmanagementbackend.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    @Query("""
                SELECT notification FROM Notification notification WHERE notification.timestamp <= CURRENT_DATE AND notification.user.id = :id
           """)
    Page<Notification> findAllDisplayableNotifications(Integer id, Pageable pageable);

    @Query("""
                SELECT notification FROM Notification notification WHERE notification.timestamp > CURRENT_DATE AND notification.user.id = :id
           """)
    Page<Notification> findAllNotificationsPastTimestamp(Integer id, Pageable pageable);

    @Query("""
                SELECT notification FROM Notification notification WHERE notification.timestamp BETWEEN :start AND :end AND notification.user.id = :id
           """)
    Page<Notification> findAllNotificationsBetweenTime(LocalDateTime start, LocalDateTime end, Integer id, Pageable pageable);
}
