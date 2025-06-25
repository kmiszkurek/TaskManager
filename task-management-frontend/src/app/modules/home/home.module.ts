import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./pages/main/main.component";
import {MenuComponent} from "./components/menu/menu.component";
import {EditProjectComponent} from "./components/edit-project/edit-project.component";
import {ProjectCardComponent} from "./components/project-card/project-card.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TaskCardComponent} from "./components/task-card/task-card.component";
import {EditTaskComponent} from "./components/edit-task/edit-task.component";
import {AssignTaskComponent} from "./components/assign-task/assign-task.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {SearchComponent} from "../../services/search/search/search.component";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
//import {CalendarComponent} from "./pages/calendar/calendar.component";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainComponent,
    MenuComponent,
    EditProjectComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    EditTaskComponent,
    SearchComponent,
    TaskCardComponent,
    AssignTaskComponent,
    MatDialogModule,
    MatButtonModule,
    CreateTaskComponent
    //CalendarComponent
  ]
})
export class HomeModule { }
