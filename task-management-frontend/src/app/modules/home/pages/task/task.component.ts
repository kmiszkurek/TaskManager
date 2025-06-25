import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {PageResponseTaskResponse} from "../../../../services/models/page-response-task-response";
import {TaskService} from "../../../../services/services/task.service";
import {Router, RouterLink} from "@angular/router";
import {TaskCardComponent} from "../../components/task-card/task-card.component";
import {Subscription} from "rxjs";
import { SearchService } from '../../../../services/search/search.service';
import {TaskResponse} from "../../../../services/models/task-response";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TaskCardComponent,
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit, OnDestroy {

  taskResponse: PageResponseTaskResponse = {};
  filteredTasks: TaskResponse[] = [];
  page = 0;
  size = 8;
  pages: any = [];
  isLoading = true;
  message = '';
  level: 'success' | 'error' = 'success';
  searchSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private searchService: SearchService,
  ) {}

  ngOnInit() {
    this.findAllTasks();
    this.searchSubscription = this.searchService.searchTerm$.subscribe(({ prefix, term }) => {
      console.log(`Received prefix: ${prefix}, term: ${term}`);
      if (prefix === '&') {
        console.log('Filtering projects by term:', term);
        this.filterTasks(term);
      } else {
        console.log('Prefix is not &, showing all projects.');
        this.filteredTasks = this.taskResponse.content ?? [];
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private findAllTasks() {
    this.isLoading = true;
    this.taskService.findAllTasks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (tasks) => {
        this.taskResponse = tasks;
        this.filteredTasks = this.taskResponse.content ?? [];
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

  private filterTasks(searchTerm: string) {
    if (this.taskResponse.content && searchTerm) {
      console.log('Filtering projects...');
      this.filteredTasks = this.taskResponse.content.filter(task =>
        task.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      console.log('No search term or no projects found, resetting filter.');
      this.filteredTasks = this.taskResponse.content ?? [];
    }
  }

  createTask() {
    this.router.navigate(['/home/create-task']);
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
