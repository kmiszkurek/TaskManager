import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../../../services/services/task.service";
import {TaskResponse} from "../../../../services/models/task-response";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DeleteTask$Params} from "../../../../services/fn/task/delete-task";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  private _task: TaskResponse = {};

  get task(): TaskResponse {
    return this._task;
  }

  @Input()
  set task(value: TaskResponse) {
    this._task = value;
  }

  private _manage = false;

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  deleteTask(): void {
    if(this.task.id === undefined){
      console.error('Task ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const params: DeleteTask$Params = { 'task-id': this.task.id };

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.taskService.deleteTask(params).subscribe( {
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            console.error('Error deleting task', error);
          }
        });
      } else {
        console.log('Deletion canceled');
      }
    });
  }

  getPriorityClass(priority: string | undefined) {
    switch(priority) {
      case 'High':
        return 'badge bg-danger';
      case 'Medium':
        return 'badge bg-warning';
      case 'Low':
        return 'badge bg-primary';
      default:
        return 'badge bg-light';
    }
  }

  getStatusClass(taskStatus: string | undefined) {
    switch(taskStatus) {
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
}
