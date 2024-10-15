import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../../services/services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location, NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskRequest} from "../../../../services/models/task-request";
import {AssignTaskToProject$Params} from "../../../../services/fn/task/assign-task-to-project";

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {

  assignTaskForm!: FormGroup;
  projectId!: number;
  priorityOptions: string[] = ['High', 'Medium', 'Low'];


  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.projectId = Number(taskId);
      this.assignTaskForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        dueDate: ['', Validators.required],
        priority: ['', Validators.required]
      });
    }
  }

  assignTask(): void {
    if (this.assignTaskForm.valid) {
      const taskData: TaskRequest = {
        id: this.projectId,
        title: this.assignTaskForm.get('title')?.value,
        description: this.assignTaskForm.get('description')?.value,
        dueDate: this.assignTaskForm.get('dueDate')?.value,
        priority: this.assignTaskForm.get('priority')?.value,
        taskStatus: 'To Do'
      };

      const params: AssignTaskToProject$Params = {
        'project-id': this.projectId,
        body: taskData
      };


      this.taskService.assignTaskToProject(params).subscribe({
        next: (response) => {
          console.log('Task assigned successfully', response);
          this.location.back();
        },
        error: (err) => {
          console.error('Error assigning task:', err);
        }
      });
    }
  }

}

