import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProjectCardComponent} from "../../components/project-card/project-card.component";
import {PageResponseTaskResponse} from "../../../../services/models/page-response-task-response";
import {TaskService} from "../../../../services/services/task.service";
import {Router} from "@angular/router";
import {TaskCardComponent} from "../../components/task-card/task-card.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ProjectCardComponent,
    TaskCardComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  taskResponse: PageResponseTaskResponse = {};
  page = 0;
  size = 8;
  pages: any = [];
  isLoading = true;
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.findAllTasks();
  }

  private findAllTasks() {
    this.isLoading = true;
    this.taskService.findAllTasks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (tasks) => {
        this.taskResponse = tasks;
        this.pages = Array(this.taskResponse.totalPages)
          .fill(0)
          .map((x, i) => i);
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Error while loading tasks';
        this.level = 'error';
      },
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllTasks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllTasks();
  }

  goToLastPage() {
    this.page = this.taskResponse.totalPages as number - 1;
    this.findAllTasks();
  }

  goToNextPage() {
    this.page++;
    this.findAllTasks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllTasks();
  }

  get isLastPage() {
    return this.page === this.taskResponse.totalPages as number - 1;
  }

}
