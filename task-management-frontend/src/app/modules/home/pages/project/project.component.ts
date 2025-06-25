// import {Component, Input, OnInit} from '@angular/core';
// import {ProjectService} from "../../../../services/services/project.service";
// import {ProjectCardComponent} from "../../components/project-card/project-card.component";
// import {PageResponseProjectResponse} from "../../../../services/models/page-response-project-response";
// import {Router} from "@angular/router";
// import {CommonModule} from "@angular/common";
//
// @Component({
//   selector: 'app-project',
//   standalone: true,
//   imports: [
//     ProjectCardComponent,
//     CommonModule
//   ],
//   templateUrl: './project.component.html',
//   styleUrl: './project.component.scss'
// })
//
// export class ProjectComponent implements OnInit {
//
//   projectResponse: PageResponseProjectResponse = {};
//   page = 0;
//   size = 8;
//   pages: any = [];
//   isLoading = true;
//   message = '';
//   level: 'success' | 'error' = 'success';
//
//
//   constructor(
//     private projectService: ProjectService,
//     private router: Router
//   ) {}
//
//   ngOnInit() {
//     this.findAllProjects();
//   }
//
//
//   private findAllProjects() {
//     this.isLoading = true;
//     this.projectService.findAllProjects({
//       page: this.page,
//       size: this.size
//     }).subscribe({
//       next: (projects) => {
//         this.projectResponse = projects;
//         this.pages = Array(this.projectResponse.totalPages)
//           .fill(0)
//           .map((x, i) => i);
//       },
//       error: () => {
//         this.isLoading = false;
//         this.message = 'Error while loading projects';
//         this.level = 'error';
//       },
//     });
//   }
//
//   goToPage(page: number) {
//     this.page = page;
//     this.findAllProjects();
//   }
//
//   goToFirstPage() {
//     this.page = 0;
//     this.findAllProjects();
//   }
//
//   goToLastPage() {
//     this.page = this.projectResponse.totalPages as number - 1;
//     this.findAllProjects();
//   }
//
//   goToNextPage() {
//     this.page++;
//     this.findAllProjects();
//   }
//
//   goToPreviousPage() {
//     this.page--;
//     this.findAllProjects();
//   }
//
//   get isLastPage() {
//     return this.page === this.projectResponse.totalPages as number - 1;
//   }
//
//   createProject() {
//     this.router.navigate(['/home/create-project']);
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../../../services/services/project.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { PageResponseProjectResponse } from '../../../../services/models/page-response-project-response';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProjectResponse } from '../../../../services/models/project-response';
import { SearchService } from '../../../../services/search/search.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ProjectCardComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  projectResponse: PageResponseProjectResponse = {};
  filteredProjects: ProjectResponse[] = [];
  page = 0;
  size = 8;
  pages: number[] = [];
  isLoading = true;
  message = '';
  level: 'success' | 'error' = 'success';
  searchSubscription!: Subscription;

  constructor(
    private projectService: ProjectService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.findAllProjects();

    this.searchSubscription = this.searchService.searchTerm$.subscribe(({ prefix, term }) => {
      console.log(`Received prefix: ${prefix}, term: ${term}`);
      if (prefix === '#') {
        console.log('Filtering projects by term:', term);
        this.filterProjects(term);
      } else {
        console.log('Prefix is not #, showing all projects.');
        this.filteredProjects = this.projectResponse.content ?? [];
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  private findAllProjects() {
    this.isLoading = true;
    this.projectService.findAllProjects({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (projects) => {
        this.projectResponse = projects;
        this.filteredProjects = this.projectResponse.content ?? [];

        this.pages = Array(this.projectResponse.totalPages ?? 0).fill(0).map((x, i) => i);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Error while loading projects';
        this.level = 'error';
      },
    });
  }

  private filterProjects(searchTerm: string) {
    if (this.projectResponse.content && searchTerm) {
      console.log('Filtering projects...');
      this.filteredProjects = this.projectResponse.content.filter(project =>
        project.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      console.log('No search term or no projects found, resetting filter.');
      this.filteredProjects = this.projectResponse.content ?? [];
    }
  }




  goToPage(page: number) {
    this.page = page;
    this.findAllProjects();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllProjects();
  }

  goToLastPage() {
    this.page = this.projectResponse.totalPages as number - 1;
    this.findAllProjects();
  }

  goToNextPage() {
    this.page++;
    this.findAllProjects();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllProjects();
  }

  get isLastPage() {
    return this.page === this.projectResponse.totalPages as number - 1;
  }

  createProject() {
    this.router.navigate(['/home/create-project']);
  }
}
