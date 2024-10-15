import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectResponse } from "../../../../services/models/project-response";
import { DatePipe, NgClass } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ProjectService } from "../../../../services/services/project.service";
import { DeleteProject$Params } from "../../../../services/fn/project/delete-project";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  private _project: ProjectResponse = {};

  get project(): ProjectResponse {
    return this._project;
  }

  @Input()
  set project(value: ProjectResponse) {
    this._project = value;
  }

  private _manage = false;

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  getStatusClass(status: string | undefined): string {
    switch(status) {
      case 'To Do':
        return 'badge bg-secondary';
      case 'In Progress':
        return 'badge bg-warning text-dark';
      case 'Done':
        return 'badge bg-success';
      default:
        return 'badge bg-light';
    }
  }

  deleteProject() {
    if (this.project.id === undefined) {
      console.error('Project ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const params: DeleteProject$Params = { 'project-id': this.project.id };

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(params).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (err) => console.error('Error deleting project:', err)
        });
      } else {
        console.log('Deletion canceled');
      }
    });
  }

}
