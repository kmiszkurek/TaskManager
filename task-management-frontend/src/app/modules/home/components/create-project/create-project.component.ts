import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../services/services/project.service";
import {NgForOf, NgIf} from "@angular/common";
import {ProjectRequest} from "../../../../services/models/project-request";
import {SaveProject$Params} from "../../../../services/fn/project/save-project";

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent{

  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.projectForm.valid) {
      const createData: ProjectRequest={
        name: this.projectForm.get('name')?.value,
        description: this.projectForm.get('description')?.value,
        startDate: this.projectForm.get('startDate')?.value,
        endDate: this.projectForm.get('endDate')?.value,
        status: 'To Do'
      }

      const params: SaveProject$Params = {
        body: createData
      }

      this.projectService.saveProject(params).subscribe(() => {
        this.router.navigate(['/home/projects']);
      });
    }
  }
}
