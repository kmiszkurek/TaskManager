import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { TaskService } from '../../../../services/services';
import { TaskRequest } from '../../../../services/models';
import {SaveTask$Params} from "../../../../services/fn/task/save-task";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.taskForm.valid) {
      const createData: TaskRequest={
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        dueDate: this.taskForm.get('dueDate')?.value,
        priority: this.taskForm.get('priority')?.value,
        taskStatus: 'Low'
      }

      const params: SaveTask$Params = {
        body: createData
      }

      this.taskService.saveTask(params).subscribe( () => {
        this.router.navigate(['/home/tasks']);
      });

    }
  }

}
