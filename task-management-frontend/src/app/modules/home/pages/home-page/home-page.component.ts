import {Component, OnInit} from '@angular/core';
import {NotificationControllerService} from "../../../../services/services/notification-controller.service";
import {Router, RouterLink} from "@angular/router";
import {PageResponseNotificationResponse} from "../../../../services/models/page-response-notification-response";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ProjectService} from "../../../../services/services/project.service";
import {ProjectCardComponent} from "../../components/project-card/project-card.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgIf,
    ProjectCardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  notificationResponse: PageResponseNotificationResponse = {};
  endingProjects: any[] = [];
  endingTasks: any[] = [];

  page = 0;
  size = 0;

  constructor(
    private notificationService: NotificationControllerService,
    private router: Router,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
        this.findAllNotifications();
        this.loadEndingProjects();
    }

  private findAllNotifications() {

    this.notificationService.findAllNotifications({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (notifications) => {
        this.notificationResponse = notifications;
      }
    })
  }

  loadEndingProjects() {
    this.projectService.getEndingProjects().subscribe((response: any) => {
      console.log(response);
      this.endingProjects = response.content;
    });
  }


}
