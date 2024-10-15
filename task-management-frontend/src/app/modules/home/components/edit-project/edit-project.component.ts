import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../services/services/project.service';
import {CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup;
  // statusOptions: string[] = ['To Do', 'In Progress', 'Done'];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      const idNumber = Number(projectId);
      if (!isNaN(idNumber)) {
        this.projectService.findProjectById({ 'project-id': idNumber })
          .subscribe((projectResponse) => {
            if (this.projectForm) {
              this.projectForm.patchValue({
                name: projectResponse.name,
                description: projectResponse.description,
                startDate: projectResponse.startDate,
                endDate: projectResponse.endDate,
                status: projectResponse.status
              });
              this.projectForm.get('status')?.updateValueAndValidity();
            }
          });
      } else {
        console.error("Invalid project ID");
      }
    } else {
      console.error("Project ID is undefined");
    }
  }


  onSubmit() {
    if (this.projectForm?.valid) {
      const editedProject = this.projectForm.value;
      const projectId = this.route.snapshot.paramMap.get('id');
      if (projectId) {
        const idNumber = Number(projectId);
        if (!isNaN(idNumber)) {
          this.projectService.editProject({
            'project-id': idNumber,
            body: editedProject
          }).subscribe(() => {
            console.log("Project updated successfully");
            this.location.back();
          });
        }
      }
    }
  }
}
