import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TaskService} from "../../../../services/services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location, NgForOf} from "@angular/common";

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  statusOptions: string[] = ['To Do', 'In Progress', 'Done'];
  priorityOptions: string[] = ['High', 'Medium', 'Low'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      taskStatus: [''],
      dueDate: [''],
      priority: ['']
    });
    }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if(taskId){
      const idNumber = Number(taskId);
      if(!isNaN(idNumber)){
        this.taskService.findTaskById({'task-id': idNumber})
          .subscribe((taskResponse) => {
            if(this.taskForm){
              this.taskForm.patchValue({
                title: taskResponse.title,
                description: taskResponse.description,
                dueDate: taskResponse.dueDate,
                taskStatus: taskResponse.taskStatus,
                priority: taskResponse.priority
              });
            }
          });
      } else {
        console.error("Invalid task ID");
      }
    } else {
      console.error("Task ID is undefined");
    }
  }

  onSubmit() {
    if (this.taskForm?.valid) {
      const editedTask = this.taskForm.value;
      const taskId = this.route.snapshot.paramMap.get('id');
      if (taskId) {
        const idNumber = Number(taskId);
        if (!isNaN(idNumber)) {
          this.taskService.editTask({
            'task-id': idNumber,
            body: editedTask
          }).subscribe(() => {
            console.log("Task updated successfully");
            this.location.back();
          });
        }
      }
    }
  }


}
